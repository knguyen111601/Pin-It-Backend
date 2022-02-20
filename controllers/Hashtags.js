const express = require("express")
const pool = require("../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtMiddleware = require("../middleware/jwt")

const router = express.Router()

// Index Route All Hashtags
router.get("/", async (req, res) => {
    try {
        const allCollections = await pool.query('SELECT * FROM hashtags') 
        res.json(allCollections.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Show single Hashtag
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const oneHashtag = await pool.query('SELECT * FROM hashtags WHERE id=$1', [id])
        res.json(oneHashtag.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Show Hashtags relating to single pin
router.get("/pin/:id", async (req, res) => {
    try {
        const pin_id = req.params.id
        const pinHashtags = await pool.query('SELECT * FROM hashtags WHERE pin_id=$1', [pin_id])
        res.json(pinHashtags.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Create hashtag 
router.post("/", async (req, res) => {
    try {
        const {tag, pin_id} = req.body
        const createHashtags = await pool.query('INSERT INTO hashtags (tag, pin_id) VALUES ($1,$2) RETURNING *', [tag, pin_id])
        res.json(createHashtags.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Update Hashtag
router.put("/:id", async (req, res) => {
    try {
        const {tag} = req.body
        const id = req.params.id
        const updateHashtag = await pool.query('UPDATE hashtags SET tag=$1 WHERE id=$2 RETURNING *', [tag, id])
        res.json(updateHashtag.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Delete Hashtag 
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const savedHashtag = await pool.query('SELECT * FROM hashtags WHERE id=$1', [id])
        const deleteHashtag = await pool.query('DELETE FROM hashtags WHERE id=$1', [id])
        res.json(savedHashtag.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Show all posts with specific hashtag SEARCH FUNCTION
router.post("/search", async (req, res) => {
    try {
        // Grab Term
        const {term} = req.body
        // Query any hashtags with the term
        const pinsWithHashtag = await pool.query("SELECT * FROM hashtags WHERE LOWER(tag) LIKE " + "'" + "%" + `${term.toLowerCase()}` + "%" + "'")

        const pin_idArr = new Set
        // push pin_id's from the matching hashtags
        if (pinsWithHashtag.rows.length > 0) {
            for (item of pinsWithHashtag.rows) {
                pin_idArr.add(item.pin_id)
            }
        } else {
            res.json({found: false})
        }

        // If there are pin_id's pushed into arr
        if (pin_idArr.size > 0) {
            // Show matches
            const match = []
            for (id of pin_idArr) {
                // search any pins with that id
                const matchingPins = await pool.query('SELECT * FROM pins WHERE id=$1', [id])
                if (!match.includes(matchingPins.rows[0].id)) {
                    match.push(matchingPins.rows[0])
                }
            }
            res.json(match) // sends matching pins
        }
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})


module.exports = router