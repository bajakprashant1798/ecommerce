import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState.js'
import ProductList from '../utils/productList/ProductList.js'

function Product() {
  const state = useContext(GlobalState)
  const [products] = state.productsApi.products
  const [isAdmin] = state.userApi.isAdmin

  return (
    <div className='products'>  
      {
        products.map((product) => {
          return <ProductList key={product._id} product={product} isAdmin={isAdmin} />
        })
      }      
    </div>
  )
}

export default Product