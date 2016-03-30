const backend = require('../backend')

exports.index = (req, res) => {
  res.render('jobs/index', {
    title: `Berufssuche`,
  })
}

exports.results = (req, res) => {
  const query = req.query.query

  Promise.all([
    backend.jobs(query)
  ]).then((result) => {
    res.render('jobs/results', {
      results: result[0]
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}

