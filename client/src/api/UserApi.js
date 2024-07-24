import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserApi(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        if (token) {
            const getUser = async() => {
                try {
                    const res = await axios.get('/users/information', {
                        headers: {Authorization:token}
                    })
                    
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                } catch (error) {
                    alert(error.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    const addCart = (product) => {
        if(!isLogged) return alert("Please Login...")
    

        const check = cart.every(item => {
            return item.id !== product._id
        })

        if (check) {
            setCart([...cart, {...product, quantity: 1}])
        } else {
            alert("This product has been already added in cart")
        }
    }

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart
  }
}

export default UserApi