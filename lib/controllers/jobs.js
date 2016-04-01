const backend = require('../backend')

exports.index = (req, res) => {
  let referer = req.query['referer']
  res.render('jobs/index', {
    title: 'Berufssuche',
    referer: referer
  })
}

exports.results = (req, res) => {
  const query = req.query.query || req.query.q
  const referer = req.query.referer

  Promise.all([
    backend.jobs(query)
  ]).then((result) => {
    if (req.get('Accept').includes('json')) {
      const response = result[0].map((item) => {
        return {
          id: parseInt(item.berufId),
          text: item.name
        }
      })
      res.json({ results: response })
    } else {
      res.render('jobs/results', {
        results: result[0],
        referer: referer
      })
    }
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}

