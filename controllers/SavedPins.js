const express = require("express")
const pool = require("../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtMiddleware = require("../middleware/jwt");

const router = express.Router()

// Get all pins
router.get("/", async (req, res) => {
    try {
        const allSavedPins = await pool.query('SELECT * FROM saved_pins')
        res.json(allSavedPins.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

router.get("/:id", async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Creates a saved pin to a collection 
router.post("/", async (req, res) => {
    try {
        const {original_post_id, collection_id, user_id} = req.body

        const og_post = await pool.query('SELECT * FROM pins WHERE id=$1', [original_post_id])
        console.log(og_post.rows[0])
        const {title, description, image, id, user_pfp} = og_post.rows[0]

        const postToCollection = await pool.query('INSERT INTO saved_pins (title, description, image, user_id, original_post_id, collection_id, user_pfp) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [title, description, image, user_id, id, collection_id, user_pfp])

        res.json(postToCollection.rows[0])

    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Delete a pinned item 
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const savedPin = await pool.query('SELECT * FROM saved_pins WHERE id=$1', [id])
        const deleteSavedPin = await pool.query('DELETE FROM saved_pins WHERE id=$1', [id])
        res.json(savedPin.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

router.get("/collections/:collectionid", async (req, res)=> {
    try {
        const {collectionid} = req.params
        const allPins = await pool.query('SELECT * FROM saved_pins WHERE collection_id=$1', [collectionid])
        res.json(allPins.rows)
    } catch (err) {
        res.status(500).json({err:err.message})
    }
})

// Show all original pins when viewing collection
// router.get("/og", async (req, res) => {
//     try {
//         const {collection_id} = req.body
//         const grabPinIds = await pool.query('SELECT * FROM saved_pins WHERE collection_id=$1',[collection_id])
//         if (grabPinIds.rows.length > 0) {
//             const ids = []
//             for (item of grabPinIds.rows) {
//                 ids.push(item.original_post_id)
//             }

//             const match = []
//             for (item of ids) {
//                 const pins = await pool.query('SELECT * FROM pins WHERE id=$1', [item])
//                 match.push(pins.rows[0])
//             }
//             // Removes duplicate objects
//             for (let i = 0; i < match.length; i++) {
//                 for (let j = i+1; j < match.length; j++) {
//                     if (match[i].id == match[j].id) {
//                         match.splice(j,1)
//                     }
//                 }
//             }
//             res.json(match)
//         }
//     } catch (err) {
//         res.status(500).json({err: err.message})
//     }
// })



module.exports = router