import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
const app = express()
const port = process.env.port || 5000


app.listen(port, ()=>{
    console.log(`server started at port ${port}` )
})