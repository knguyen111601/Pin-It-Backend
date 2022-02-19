const cookieParser = require("cookie-parser");
const express = require("express")
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000
const dotenv = require("dotenv")

// Controllers
const UsersRouter = require("./controllers/Users")
const AuthRouter = require("./controllers/Auth")

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config()


app.get("/", (req, res)=> {
    res.send("Hello World")
})

// Signup Router
app.use("/api/users", UsersRouter)

// Login Router
app.use("/api/auth", AuthRouter)

app.listen(PORT, ()=>{console.log(`App listening on PORT ${PORT}`)})