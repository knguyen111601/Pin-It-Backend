const express = require("express")
const pool = require("../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtMiddleware = require("../middleware/jwt")

const router = express.Router()


// Index Route Show All Users
router.get("/", jwtMiddleware, async (req, res)=> {
    try {
        const users = await pool.query('SELECT * FROM users')
        res.json({users : users.rows})
    } catch (err) {
        res.status(500).json({err : err.message})
    }
});

// Create User (Signup)
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // hash 10 rounds 
        const signup = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [req.body.username, hashedPassword, req.body.email])
        res.json({users: signup.rows[0]})
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

router.post("/login", async (req, res) => {
    try {
        // USERNAME CHECK
        const {username, password} = req.body
        const users = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
        
        if (users.rows[0]) {
            const match = await bcrypt.compare(password, users.rows[0].password)
            const id = users.rows[0].id
            const pfp = users.rows[0].pfp
            const email = users.rows[0].email
            if (match) {
                const token = await jwt.sign({username}, process.env.SECRET)
                res.status(200).json({token, username, id, pfp, email})
            } else {
                res.status(400).json({error: "PASSWORD DOES NOT MATCH"})
            }
        } else {
            res.status(400).json({error: "USER DOES NOT EXIST"})
        }

        // if (users.rows.length === 0) {
        //     return res.status(401).json({err: "Username not found"})
        // }

        // // PASSWORD CHECK
        // const validPassword = await bcrypt.compare(password, users.rows[0].password)
        // if (!validPassword) {
        //     return res.status(401).json({err: "Incorrect password"})
        // }

        // // JWT
        // let tokens = jwtTokens(users.rows[0]) // passing to jwtToken helper function that will deliver jwt
        // res.cookie('refresh_token', tokens.refreshToken, {httpOnly:true})
        // res.json(tokens) // sends the return from the helper function 

    } catch (err) {
        res.status(401).json({err: err.message})
    }
})

module.exports = router