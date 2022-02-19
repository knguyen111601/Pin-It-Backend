const express = require("express")
const pool = require("../db/db")
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authorization"); // verify logged in middleware

const router = express.Router()


// Index Route Show All Users
router.get("/", authenticateToken, async (req, res)=> {
    try {
        const users = await pool.query('SELECT * FROM users')
        res.json({users : users.rows})
    } catch (err) {
        res.status(500).json({err : err.message})
    }
});

// Create User (Signup)
router.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // hash 10 rounds 
        const signup = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [req.body.username, hashedPassword, req.body.email])
        res.json({users: signup.rows[0]})
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

module.exports = router