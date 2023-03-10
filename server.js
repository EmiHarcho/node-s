const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postRoutes = require('./routes/post-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')
const postApiRoutes = require('./routes/api-post-routes')
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs')


mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error))

app.listen(process.env.PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log('lintening port', process.env.PORT)
})
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(express.static('styles'))
app.use(methodOverride('_method')) 

app.get('/', (req, res) => {
    const title = 'Contacts'
    res.render(createPath('index'), {title})
})

// ABOUT US
app.get('/about-us', (req, res) => {
    req.redirect('/contacts')
})
app.use(postRoutes)
app.use(contactRoutes)
app.use(postApiRoutes)

//ERROR
app.use((req, res) => {
    const title = 'Error Page'
    res
    .status(404)
    .render(createPath('error'), {title})
})
