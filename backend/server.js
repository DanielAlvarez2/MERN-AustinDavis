const connect = require("./connect.js")
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.listen(PORT, ()=>{
    connect.connectToServer()
    console.log('DB Connected.')
    console.log(`Server Running on Port: ${PORT}`)
})
