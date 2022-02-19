const express = require("express")
const pool = require("../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtMiddleware = require("../middleware/jwt");
const { application } = require("express");

const router = express.Router()

// Index Route All collections 
router.get("/", async (req, res) => {
    try {
        const allCollections = await pool.query('SELECT * FROM collections')
        res.json(allCollections.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Create Route 
router.post("/", async (req, res) => {
    try {
        const {title, description, user_id, user_username} = req.body
        const createCollection = await pool.query('INSERT INTO collections (title, description, user_id, user_username) VALUES ($1, $2, $3, $4) RETURNING *', [title, description, user_id, user_username])
        res.json(createCollection.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Update Route
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const {title, description} = req.body
        const updateCollection = await pool.query('UPDATE collections SET title=$1, description=$2 WHERE id=$3 RETURNING *', [title, description, id])
        res.json(updateCollection.rows)

    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const saveCollection = await pool.query('SELECT * FROM collections WHERE id=$1', [id])
        const deleteCollection = await pool.query('DELETE FROM collections WHERE id=$1', [id])
        res.json(saveCollection.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})


// Show Route Specific Collection by ID
router.get("/:id", async (req, res)=> {
    try {
        const id = req.params.id
        const oneCollection = await pool.query('SELECT * FROM collections WHERE id=$1', [id])
        res.json(oneCollection.rows[0])
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

// Show all collections related to account
router.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id
        const allUserCollections = await pool.query('SELECT * FROM collections WHERE user_id=$1', [id])
        res.json(allUserCollections.rows)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})


module.exports = router