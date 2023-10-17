const dotenv = require('dotenv')
dotenv.config()
require('./db/config.js')
const cors = require('cors')
const express = require('express')
const User = require('./db/User.js')
const Product = require('./db/Product.js')
const app = express()
const port = process.env.port || 5000

app.use(express.json())
app.use(cors())

//Register
app.post('/register', async (req, res)=>{
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    console.log('result11', result)
    delete result.password
   res.send(result)   // we can take response from postman by writing res.send(). other method is res.json()
})

// Login
app.post('/login', async (req, res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select('-password')
        if(user){
            res.send(user)
        }else{
            res.send({ message: "No User Found" })
        }
    }else{
        res.send({ message: "Enter both fields" })
    }  
})

app.post('/add-product', async (req, res)=>{
    console.log(req.body)
    let product  = new Product(req.body)
    const result = await product.save()
    res.send(result)
})

app.get('/products', async(req, res)=>{
   let products = await Product.find()
   if(products.length > 0){
    res.send(products)
   }else{
    res.send({message: "No Products Found"})
   }
})

app.delete('/product/:id', async (req, res)=>{
    console.log(req.params)
    const result = await Product.deleteOne({'_id':req.params.id})
    res.send(result)
})

app.get('/product/:id', async (req, res)=>{ // for above api also endpoint is same, but method is diff, so no issue
    let result = await Product.findOne({'_id':req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({message:"No Record Found"})
    }
})

app.put('/product/:id', async (req, res)=>{
    let result = await Product.updateOne(
        { '_id': req.params.id},
        { $set: req.body }
        )
        res.send(result)
})

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})