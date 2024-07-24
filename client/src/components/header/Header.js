import React, { useContext } from 'react'
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userApi.isLogged
    const [isAdmin, setIsAdmin] = state.userApi.isAdmin
    const [cart] = state.userApi.cart

    const logoutUser = async () => {
        await axios.get("/users/logout")

        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
    }

    const adminRouter = () => {
        return(
            <>
                <li> <Link to="/create_product">Create Product</Link> </li>
                <li> <Link to="/category">Categories</Link> </li>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <>
                <li> <Link to="/history">History</Link> </li>
                <li> <Link to="/" onClick={logoutUser}>Logout</Link> </li>
            </>
        )
    }
  return (
    <header>
        <div className='menu'>
            <MdMenu size={30} />
        </div>

        <div className='logo'>
            <h1>
                <Link to="/">{isAdmin ? 'Admin' : 'Store'}</Link>
            </h1>
        </div>
        
        <ul>
            <li>
                <Link to="/products">{isAdmin ? 'Products' : 'Shop'}</Link>
            </li>

            {isAdmin && adminRouter()}
            {
                isLogged ? loggedRouter() : <li><Link to="/login">Login or Register</Link></li>
            }

            

            <li>
                <MdClose size={30} className='menu' />
            </li>
        </ul>

        
        {
            isAdmin ? '' 
            : 
            <div className='cart-icon'>
                <span>{cart.length}</span>
                <Link to="/cart"><MdOutlineAddShoppingCart size={30} /></Link>
            </div>
        }

    </header>
  )
}

export default Header