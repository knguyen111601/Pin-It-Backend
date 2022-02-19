const express = require("express")
const pool = require("../db/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtTokens = require("../utils/jwt-helpers")

const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        // USERNAME CHECK
        const {username, password} = req.body
        const users = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
        if (users.rows.length === 0) {
            return res.status(401).json({err: "Username not found"})
        }

        // PASSWORD CHECK
        const validPassword = await bcrypt.compare(password, users.rows[0].password)
        if (!validPassword) {
            return res.status(401).json({err: "Incorrect password"})
        }

        // JWT
        let tokens = jwtTokens(users.rows[0]) // passing to jwtToken helper function that will deliver jwt
        res.cookie('refresh_token', tokens.refreshToken, {httpOnly:true})
        res.json(tokens) // sends the return from the helper function 

    } catch (err) {
        res.status(401).json({err: err.message})
    }
})


module.exports = router