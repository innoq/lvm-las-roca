const backend = require('../backend')
const branches = require('../data/branches')
const enrichBranches = require('../enricher').enrichBranches
const enrichProposals = require('../enricher').enrichProposals

exports.get = (req, res) => {
  Promise.all([
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.proposals(req.params.id)
  ]).then((result) => {
    res.render('proposals', {
      branches: enrichBranches(branches, result[0]),
      partner: result[1],
      proposals: enrichProposals(result[2])
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}
