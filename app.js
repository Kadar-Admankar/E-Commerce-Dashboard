const dotenv = require('dotenv')
dotenv.config()
require('./db/config.js')
const cors = require('cors')
const express = require('express')
const User = require('./db/User.js')
const app = express()
const port = process.env.port || 5000

app.use(express.json())
app.use(cors())
app.post('/register', async (req, res)=>{
    let user = new User(req.body)
    const result = await user.save()
   res.send(result)
})


app.listen(port, ()=>{
    console.log(`server started at port ${port}` )
})