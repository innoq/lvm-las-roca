const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const searchController = require('./lib/controllers/search')
const resultController = require('./lib/controllers/result')
const partnersController = require('./lib/controllers/partners')

// Set up Mustache as the view engine
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.set('layout', 'layout')

// Mount the assets
app.use('/assets', express.static('public'))

app.get('/', searchController.get)
app.get('/result', resultController.get)
app.get('/partners/:id', partnersController.get)

app.listen(8080, () => console.log('Listening on port 8080!'))
