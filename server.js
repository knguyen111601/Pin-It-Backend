const cookieParser = require("cookie-parser");
const express = require("express")
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000
const dotenv = require("dotenv")

// Controllers
const UsersRouter = require("./controllers/Users")
const PinsRouter = require("./controllers/Pins")
const CollectionsRouter = require("./controllers/Collections")
const HashtagsRouter = require("./controllers/Hashtags")
const SavedPinsRouter = require("./controllers/SavedPins")

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config()


app.get("/", (req, res)=> {
    res.send("Hello World")
})

// Signup/Login Router
app.use("/api/users", UsersRouter)

// Pins Router
app.use("/api/pins", PinsRouter)

// Collections Router
app.use("/api/collections", CollectionsRouter)

// Hashtags Router 
app.use("/api/hashtags", HashtagsRouter)

// SavedPins Router
app.use("/api/savedpins", SavedPinsRouter)


app.listen(PORT, ()=>{console.log(`App listening on PORT ${PORT}`)})