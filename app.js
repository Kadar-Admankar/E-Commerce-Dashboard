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
    let result = await user.save()
    result = result.toObject()
    console.log('result11', result)
    delete result.password
   res.send(result)   // we can take response from postman by writing res.send(). other method is res.json()
})

app.post('/login', async (req, res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select('-password')
        if(user){
            res.send(user)
        }else{
            res.send({ message: "No User Found" })
        }
    }else{
        res.send({ message: "No User Found" })
    }
    
     
})

app.listen(port, ()=>{
    console.log(`server started at port ${port}` )
})