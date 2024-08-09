const express = require("express")
var cors = require('cors')
require("./db")
const app = express()
const port = 5000

 
app.use(cors())
app.use(express.json())

// Available Routes
app.use("/api/auth", require("./routes/user"))
app.use("/api", require("./routes/notes"))

app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.get("/api/v1/login", (req, res)=>{
    res.send("Hello login")
})

app.get("/api/v1/signup", (req, res)=>{
    res.send("Hello signup!")
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})