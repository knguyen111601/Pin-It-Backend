const jwt = require("jsonwebtoken")

// Middleware for certain routes that will require authentication 
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Bearer TOKEN
    const token = authHeader && authHeader.split(" ")[1]; // takes just token not 'Bearer'
    if (token == null) return res.status(401).json({err: "Null token"})
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload)=> {
            if (error) return res.status(403).json({err: error.message})
            req.payload = payload;
            next()
        })
}

module.exports = authenticateToken