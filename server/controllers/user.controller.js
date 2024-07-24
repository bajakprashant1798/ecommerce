import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        console.log("name", name);

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({msg:"Email already registered."})
        }

        if (password.length < 6) {
            return res.status(400).json({msg:"Password should be at least 6 charactor."})
        }

        // password encryption
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password:passwordHash
        })

        //save mongoDB
        await newUser.save()

        // create jwt to authentication
        const accessToken = createAccessToken({id:newUser._id})
        const refreshToken = createRefreshToken({id:newUser._id})

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: "/users/refresh_token"
        })

        res.json({accessToken})
        // res.json({refreshToken})
        // res.json({msg:"user registered."})

    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

const refreshTokenCookie = async(req, res) => {
    try {
        const rf_token = req.cookies.refreshToken;
    
        if (!rf_token) {
            return res.status(400).json({msg:"Please Login or Register."})
        }
    
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({msg:"Please login or register."})
            }
            const accessToken = createAccessToken({id:user.id})
            res.json({accessToken})
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({msg: "User does not exist."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            return res.status(400).json({msg: "Incorrect Password."})
        }

        const accessToken = createAccessToken({id: user._id})
        const refreshToken = createRefreshToken({id: user._id})

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/users/refresh_token"
        })

        res.json({accessToken})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const logout = async(req, res) => {
    try {
        res.clearCookie("refreshToken", {path: "/users/refresh_token"})
        return res.json({msg: "Logged Out"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")

        if (!user) {
            return res.status(400).json({msg: "User not found"})
        }
        res.json(user)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1d"})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"7d"})
}

export {registerUser, refreshTokenCookie, login, logout, getUser}