const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()

// Set up Mustache as the view engine
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.set('layout', 'layout')

// Mouunt the assets
app.use('/assets', express.static('public'))

app.get('/', function (req, res) {
  res.render('index', { title: 'World' })
})

app.listen(8080, function () {
  console.log('Listening on port 8080!')
})

