const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const port = process.env.port || 5000

app.get('/', (req, res)=>{
    res.send('app is working')
})
app.listen(port, ()=>{
    console.log(`server started at port ${port}` )
})