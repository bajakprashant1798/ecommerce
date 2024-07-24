import { createContext, useEffect, useState } from "react";
import ProductApi from "./api/ProductApi";
import axios from "axios";
import UserApi from "./api/UserApi";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)

    const refreshToken = async () => {
        const refresh = await axios.get('/users/refresh_token')
        console.log("res: ", refresh);
        setToken(refresh.data.accessToken)     
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        console.log(firstLogin);
        if(firstLogin) refreshToken()
    }, [])

    const state = {
        token: [token, setToken],
        productsApi: ProductApi(),
        userApi: UserApi(token)
    }
    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}