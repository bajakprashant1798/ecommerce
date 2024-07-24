import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ProductApi() {
    const [products, setProducts] = useState([])

    const getProducts = async() => {
        const res = await axios.get('/api/products')
        setProducts(res.data.products)
    }

    useEffect(() => {
        getProducts()
    },[])
  return {
    products: [products, setProducts]
  }
}

export default ProductApi