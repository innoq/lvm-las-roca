const backend = require('../backend')
const enrichPartners = require('../enricher').enrichPartners

exports.get = (req, res) => {
  let query = req.query['query']
  backend.findPartner(query).then((result) => {
    res.render('search_results', {
      title: 'LVM LAS ROCA - Suchergebnisse',
      results: enrichPartners(result),
      query: query
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}
