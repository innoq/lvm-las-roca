const backend = require('../backend')
const branches = require('../data/branches')
const enrichBranches = require('../enricher').enrichBranches
const enrichOffers = require('../enricher').enrichOffers

exports.get = (req, res) => {
  Promise.all([
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.offers(req.params.id)
  ]).then((result) => {
    res.render('offers', {
      branches: enrichBranches(branches, result[0]),
      partner: result[1],
      offers: enrichOffers(result[2])
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}
