const express = require("express")
const pool = require("../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtMiddleware = require("../middleware/jwt")

const router = express.Router()

// Routes

// Index Route Get All Pins
router.get("/", async (req, res) => {
    try {
        const allPins = await pool.query('SELECT * FROM pins')
        res.json(allPins.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Create Route Post Pin
router.post("/", jwtMiddleware, async (req, res) => {
    try {
        const {title, description, image, user_id, user_username} = req.body
        const postPin = await pool.query('INSERT INTO pins (title, description, image, user_id, user_username) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, description, image, user_id, user_username])
        res.json(postPin.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Show Route Get Pin by ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const showPin = await pool.query('SELECT * FROM pins WHERE id = $1', [id])
        res.json(showPin.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Update Pin 
router.put("/:id", jwtMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const {title, description, image, user_id, user_username} = req.body
        const updatePin = await pool.query('UPDATE pins SET title=$1, description=$2, image=$3 WHERE id=$4 RETURNING *', [title, description, image, id])
        res.json(updatePin.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Delete Pin 
router.delete("/:id", jwtMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const viewDeleted = await pool.query('SELECT * FROM pins WHERE id=$1', [id]) // Saves pin being deleted to view
        const deletePin = await pool.query('DELETE FROM pins WHERE id=$1', [id]) // deletes pin
        res.json(viewDeleted.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// PIN SEARCH BY TITLE FUNCTION
router.post("/search", async (req, res) => {
    try {
        const {term} = req.body
        const pinsWithTerm = await pool.query("SELECT * FROM pins WHERE LOWER(title) LIKE " + "'" + "%" + `${term.toLowerCase()}` + "%" + "'")

        if (pinsWithTerm.rows.length > 0) {
            res.json(pinsWithTerm.rows)
        } else {
            res.json({found: false})
        }
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})



// Export Router
module.exports = router