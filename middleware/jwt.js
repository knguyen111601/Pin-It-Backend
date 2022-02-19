require("dotenv").config()
const {SECRET} = process.env
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    //Authorization: "bearer token"
    try {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const payload = await jwt.verify(token, SECRET)
        if (payload) {
            req.payload = payload
            console.log(req.payload)
            next()
        } else {
            res.status(400).json({error:"VERIFICATION FAILED OR NO PAYLOAD"})
        }
    } else {
        res.status(400).json({error: "NO AUTHORIZATION HEADER"})
    }
    } catch (error) {
        res.status(400).json({error})
    }   
}

module.exports = auth