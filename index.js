const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const backend = require('./lib/backend')

// Set up Mustache as the view engine
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.set('layout', 'layout')

// Mount the assets
app.use('/assets', express.static('public'))

app.get('/', function (req, res) {
  backend.household('4711', (householdErr, household) => {
    if (householdErr) {
      throw householdErr
    }
    backend.contracts('4711', (contractErr, contracts) => {
      if (contractErr) {
        throw contractErr
      }

      res.render('index', {
        household: household,
        contracts: contracts,
        title: 'World'
      })
    })
  })
})

app.listen(8080, function () {
  console.log('Listening on port 8080!')
})
