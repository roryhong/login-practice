const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.engine('hbs', exhbs({defaultLayout : 'main' , extname : '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req , res) =>　{
    res.render('index')
})


app.listen(port , () => {
    console.log(`app is running on http://localhost:${PORT}`)
})