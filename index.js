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
  res.render('search', {})
})

app.get('/result', (req, res) => {
  res.render('search_results', {})
})

app.get('/partners/:id', (req, res) => {
  Promise.all([
    backend.household(req.params.id),
    backend.contracts(req.params.id)
  ]).then((result) => {
    res.render('partners', {
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
