const backend = require('../backend')
const branches = require('../data/branches')
const enrichBranches = require('../enricher').enrichBranches
const enrichPartner = require('../enricher').enrichPartner
const enrichOffers = require('../enricher').enrichOffers
const enrichProposals = require('../enricher').enrichProposals
const enrichContracts = require('../enricher').enrichContracts
const enrichContract = require('../enricher').enrichContract

exports.index = (req, res) => {
  Promise.all([
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.offers(req.params.id),
    backend.proposals(req.params.id),
    backend.contracts(req.params.id)
  ]).then((result) => {
    res.render('contracts/index', {
      branches: enrichBranches(branches, result[0]),
      partner: enrichPartner(result[1]),
      offers: enrichOffers(result[2]),
      proposals: enrichProposals(result[3]),
      contracts: enrichContracts(result[4])
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}

exports.show = (req, res) => {
  Promise.all([
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.offers(req.params.id),
    backend.proposals(req.params.id),
    backend.contracts(req.params.id),
    backend.contract(req.params.contract_id)
  ]).then((result) => {
    res.render('contracts/show', {
      partnerId: req.params.id,
      contractId: req.params.contract_id,
      branches: enrichBranches(branches, result[0]),
      partner: enrichPartner(result[1]),
      offers: enrichOffers(result[2]),
      proposals: enrichProposals(result[3]),
      contracts: enrichContracts(result[4]),
      contract: enrichContract(result[5])
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}

exports.edit = (req, res) => {
  Promise.all([
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.offers(req.params.id),
    backend.proposals(req.params.id),
    backend.contracts(req.params.id),
    backend.contract(req.params.contract_id)
  ]).then((result) => {
    res.render('contracts/edit', {
      branches: enrichBranches(branches, result[0]),
      partner: enrichPartner(result[1]),
      offers: enrichOffers(result[2]),
      proposals: enrichProposals(result[3]),
      contracts: enrichContracts(result[4]),
      contract: enrichContract(result[5])
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}
