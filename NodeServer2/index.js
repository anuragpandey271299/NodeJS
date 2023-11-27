const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

/*
const rahulDetails={
    firstName:'Rahul',
    lastName:'Kumar',
    email:'rahul@gmail.com'
}
const raviDetails={
    firstName:'Ravi',
    lastName:'singh',
    email:'ravi@gmail.com'
}
const rohitDetails={
    firstName:'Rohit',
    lastName:'yadav',
    email:'rohit@gmail.com'
}

app.get('/',(req,res)=>{
    res.json({message:'ALL GOOD'})
})

app.get('/rahul',(req,res)=>{
    res.render('userTemplate',rahulDetails)
})
app.get('/ravi',(req,res)=>{
    res.render('userTemplate',raviDetails)
})
app.get('/rohit',(req,res)=>{
    res.render('userTemplate',rohitDetails)
})
*/

const users = [
    {
        username: 'rahul',
        firstName: 'Rahul',
        lastName: 'Kumar',
        email: 'rahul@gmail.com',
        premium:true
    },
    {
        username: 'ravi',
        firstName: 'Ravi',
        lastName: 'singh',
        email: 'ravi@gmail.com',
        premium:false
    },
    {
        username: 'rohit',
        firstName: 'Rohit',
        lastName: 'yadav',
        email: 'rohit@gmail.com',
        premium:false
    }
]

app.get('/error404',(req,res)=>{
    res.render('error404')
})

app.get('/:username', (req, res) => {
    const { username } = req.params
    const userDetails = users.find(user => user.username === username)
    if (userDetails)
        res.render('userTemplate', userDetails)
    else
        res.redirect('/error404')
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})