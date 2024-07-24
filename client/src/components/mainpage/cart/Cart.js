import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'

function Cart() {
  const state = useContext(GlobalState)
  const [cart] = state.userApi.cart

  if (cart.length === 0) {
    return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2>
  }

  return (
      cart.map(product => (
        <div className='detail'>
            <img src={product.product.images.url} alt=''/>
            <div className='box-detail'>
                <div className='row'>
                    <h2>{product.product.title}</h2>
                    <h6>{product.product.product_id}</h6>
                </div>
                <span>${product.product.price}</span> 
                <p>{product.product.description}</p> 
                <p>{product.product.content}</p>
                <p>Sold:{product.product.sold}</p>
                <Link to='/cart' className='cart'>Buy Now</Link>
            </div>
        </div>
      ))
  )
}

export default Cart