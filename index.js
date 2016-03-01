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

app.get('/', (req, res) => {
  Promise.all([
    backend.household('4711'),
    backend.contracts('4711')
  ]).then((result) => {
    res.render('index', {
      household: result[0],
      contracts: result[1],
      title: 'World'
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
})

app.listen(8080, () => console.log('Listening on port 8080!'))
