const express = require("express")
const pool = require("../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtMiddleware = require("../middleware/jwt");
const { set } = require("lodash");

const router = express.Router()

// Add Pin to Collection 
router.get("/", async (req, res) => {
    try {
        const allSavedPins = await pool.query('SELECT * FROM saved_pins')
        res.json(allSavedPins.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

router.post("/", async (req, res) => {
    try {
        const {original_post_id, collection_id} = req.body
        const savePin = await pool.query('INSERT INTO saved_pins (original_post_id, collection_id) VALUES ($1, $2)RETURNING *', [original_post_id, collection_id])
        res.json(savePin.rows[0])
    } catch (err) {
        res.status.json({err: err.message})
    }
})

// Show all original pins when viewing collection
router.get("/og", async (req, res) => {
    try {
        const {collection_id} = req.body
        const grabPinIds = await pool.query('SELECT * FROM saved_pins WHERE collection_id=$1',[collection_id])
        if (grabPinIds.rows.length > 0) {
            const ids = []
            for (item of grabPinIds.rows) {
                ids.push(item.original_post_id)
            }

            const match = []
            for (item of ids) {
                const pins = await pool.query('SELECT * FROM pins WHERE id=$1', [item])
                match.push(pins.rows[0])
            }
            // Removes duplicate objects
            for (let i = 0; i < match.length; i++) {
                for (let j = i+1; j < match.length; j++) {
                    if (match[i].id == match[j].id) {
                        match.splice(j,1)
                    }
                }
            }
            res.json(match)
        }
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})



module.exports = router