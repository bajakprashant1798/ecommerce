import React from 'react'
import Product from "./products/Product.js"
import Login from "./login/Login.js"
import Register from "./login/Register.js"
import Cart from "./cart/Cart.js"
import DetailProduct from './utils/detailProducts/DetailProduct.js'
import { Route, Routes } from 'react-router'


function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Product />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/detail/:id" element={<DetailProduct />} />
    </Routes>
  )
}

export default Pages