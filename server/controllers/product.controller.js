import {query} from 'express'
import { Product } from "../models/product.model.js"

// filter, sorting and pagination

class APIfeatures {
    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString
    }

    filtering() {
        const queryObj = {...this.queryString} 


        const excluededFields = ['page','sort','limit']
        excluededFields.forEach(el => delete(queryObj[el]))


        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this
    }

    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('')

            this.query = this.query.sort(sortBy)

            console.log(sortBy)
        }else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }

    pagination(){
        const page = this.queryString.page * 1 || 1;

        const limit =  this.queryString.limit * 1 || 10;

        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}


const getProduct = async(req, res) => {
    try {
        const features = new APIfeatures(Product.find(), req.query).filtering().sorting().pagination()
        const products = await features.query
        res.json({status:'success', result: products.length, products: products})
        // res.json({products})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const createProduct = async(req, res) => {
    try {
        const {product_id, title, price, description, category, content, images} = req.body
        if(!images) {
            return res.status(400).json({msg: "Image cannot found"})
        }

        const product = await Product.findOne({product_id})
        if (product) {
            return res.status(400).json({msg: "Product is already exists"})
        }

        const newProduct = new Product({
            product_id, title : title.toLowerCase(), price, description, category, content, images
        })

        await newProduct.save()

        res.json({msg: "Craeted a product"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted a project"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const updateProduct = async(req, res) => {
    try {
        const {title, price, description, category, content, images} = req.body
        
        if (!images) {
            return res.status(500).json({msg: "no image uploaded"})
        }

        await Product.findByIdAndUpdate({_id:req.params.id}, {
            title: title.toLowerCase(),
            price,
            description,
            category,
            content,
            images
        })

        res.json({msg: "Updated a product"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


export {getProduct, createProduct, deleteProduct, updateProduct}