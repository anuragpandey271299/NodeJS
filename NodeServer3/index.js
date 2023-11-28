const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose=require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

const User = mongoose.model('User',{
    firstName:String,
    lastName:String,
    email:String,
    phone:Number
})

app.get('/',(req,res)=>{
    res.send('All good')
})

app.get('/users', async (req,res)=>{
    try{
        const users = await User.find({})
        res.json({
            message:'SUCCESS',
            data:users
        })
    }
    catch(error){
        res.json({
            message:'FAILED'
        })
    }
})

app.post('/users', async (req,res)=>{
    const {firstName,lastName,email,phone}=req.body
    await User.create({firstName,lastName,email,phone})
    try{
        res.json({
            message:'User created',
        })
    }
    catch(error){
        res.json({
            message:'FAILED'
        })
    }
})

app.patch('/users/:id', async (req,res)=>{
    const {id}=req.params
    const {firstName,lastName,email,phone}=req.body
    await User.findByIdAndUpdate(id,{firstName,lastName,email,phone})
    try{
        res.json({
            message:'user details updated',
        })
    }
    catch(error){
        res.json({
            message:'FAILED'
        })
    }
})

app.delete('/users/:id', async (req,res)=>{
    const {id}=req.params
    await User.findByIdAndDelete(id)
    try{
        res.json({
            message:`user with ID ${id} is DELETED`,
        })
    }
    catch(error){
        res.json({
            message:'FAILED'
        })
    }
})


app.listen(process.env.port, () => {
    mongoose.connect(process.env.mongoDB_Link)
    .then(()=>console.log('connection successfull'))
    .catch((error)=>console.log(error))
    console.log(`Server running at http://localhost:${process.env.port}`)
})