import { Category } from "../models/category.model.js"

const getCategory = async(req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const createCategory = async(req, res) => {
    try {
        const {name} = req.body
        const category = await Category.findOne({name})

        if (category) {
            return res.status(400).json({msg: "Categogy is already exists."})
        }

        const newCategory = new Category({name})

        await newCategory.save()

        res.json({msg: "Created a category"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const deleteCategory = async(req, res) => {
    try {
        const categoryId = req.params.id
        await Category.findByIdAndDelete(categoryId)
        res.json({msg: "Deleted a category."})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const updateCategory = async(req, res) => {
    try {
        const {name} = req.body
        await Category.findByIdAndUpdate({_id: req.params.id}, {name})
        
        res.json({msg: "Category has been updated."})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export {getCategory, createCategory, deleteCategory, updateCategory}