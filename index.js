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
  backend.household('4711', (err, data) => {
    if (err) {
      throw err
    }
    res.render('index', {
      household: data,
      title: 'World'
    })
  })
})

app.listen(8080, function () {
  console.log('Listening on port 8080!')
})
