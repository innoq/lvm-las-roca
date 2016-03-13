const express = require('express')
const app = express()
const searchController = require('./lib/controllers/search')
const resultController = require('./lib/controllers/result')
const partnersController = require('./lib/controllers/partners')
const offersController = require('./lib/controllers/offers')
const proposalsController = require('./lib/controllers/proposals')
const contractsController = require('./lib/controllers/contracts')

// Set up Mustache as the view engine
app.engine('mustache', require('./lib/mustache'))
app.set('views', './views')
app.set('view engine', 'mustache')
app.set('layout', 'layout')

app.use(require('./lib/render_without_layout'))

// Mount the assets
app.use('/assets', express.static('public'))

app.get('/', searchController.get)
app.get('/result', resultController.get)
app.get('/partners/:id', partnersController.get)
app.get('/partners/:id/offers', offersController.get)
app.get('/partners/:id/proposals', proposalsController.get)
app.get('/partners/:id/contracts', contractsController.get)

module.exports = app

// Only run the application if it was invoked directly (e.g. not required by a test)
if (module.parent === null) {
  const backend = require('lasrest')

  Promise.all([
    backend.listen(5100),
    app.listen(process.env.PORT || 8080)
  ]).then(() => console.log('Listening on port 8080!'))
}
