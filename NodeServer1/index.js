const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

const users = [{
    "id": 1,
    "name": "cerulean",
    "year": 2000,
    "color": "#98B2D1",
    "pantone_value": "15-4020"
},
{
    "id": 2,
    "name": "fuchsia rose",
    "year": 2001,
    "color": "#C74375",
    "pantone_value": "17-2031"
},
{
    "id": 3,
    "name": "true red",
    "year": 2002,
    "color": "#BF1932",
    "pantone_value": "19-1664"
},
{
    "id": 4,
    "name": "aqua sky",
    "year": 2003,
    "color": "#7BC4C4",
    "pantone_value": "14-4811"
},
{
    "id": 5,
    "name": "tigerlily",
    "year": 2004,
    "color": "#E2583E",
    "pantone_value": "17-1456"
},
{
    "id": 6,
    "name": "blue turquoise",
    "year": 2005,
    "color": "#53B0AE",
    "pantone_value": "15-5217"
}]

app.get('/', (req, res) => {
    res.json(users)
})

app.get('/oddUsers', (req, res) => {
    res.json(users.filter(user => user.id % 2 != 0))
})

app.get('/evenUsers', (req, res) => {
    res.json(users.filter(user => user.id % 2 === 0))
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html')
})

app.post('/api/register', (req, res) => {
    const { firstName, lastName, email } = req.body
    res.send(firstName + ' ' + lastName + ' ' + email)
})

app.get('/download', (req, res) => {
    res.download(__dirname + '/logo.png')
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})