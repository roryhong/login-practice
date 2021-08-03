const express = require('express')
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/login_list' , { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error' , () => {
    console.log('mongodb error')
})

db.once('open' , () => {
    console.log('mongodb connected')
})

app.engine('hbs', exhbs({defaultLayout : 'main' , extname : '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req , res) =>　{
    res.render('index')
})


app.listen(port , () => {
    console.log(`app is running on http://localhost:${port}`)
})