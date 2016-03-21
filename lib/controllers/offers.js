const backend = require('../backend')
const branches = require('../data/branches')
const enrichBranches = require('../enricher').enrichBranches
const enrichPartner = require('../enricher').enrichPartner
const enrichOffers = require('../enricher').enrichOffers
const enrichOffer = require('../enricher').enrichOffer
const enrichProposals = require('../enricher').enrichProposals
const enrichContracts = require('../enricher').enrichContracts
const enrichOfferAllocation = require('../enricher').enrichOfferAllocation

exports.index = (req, res) => {
  Promise.all([
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.offers(req.params.id),
    backend.proposals(req.params.id),
    backend.contracts(req.params.id)
  ]).then((result) => {
    res.render('offers/index', {
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
    backend.offer(req.params.offer_id)
  ]).then((result) => {
    res.render('offers/show', {
      branches: enrichBranches(branches, result[0]),
      partner: enrichPartner(result[1]),
      offers: enrichOffers(result[2]),
      proposals: enrichProposals(result[3]),
      contracts: enrichContracts(result[4]),
      offer: enrichOffer(result[5])
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
    backend.offer(req.params.offer_id)
  ]).then((result) => {
    res.render('offers/edit', {
      branches: enrichBranches(branches, result[0]),
      partner: enrichPartner(result[1]),
      offers: enrichOffers(result[2]),
      proposals: enrichProposals(result[3]),
      contracts: enrichContracts(result[4]),
      offer: enrichOffer(result[5])
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}

exports.new = (req, res) => {
  Promise.all([
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.offers(req.params.id),
    backend.proposals(req.params.id),
    backend.contracts(req.params.id),
    backend.offerAllocation(req.params.id)
  ]).then((result) => {
    console.log(enrichOfferAllocation(result[5]))
    res.render('offers/new', {
      branches: enrichBranches(branches, result[0]),
      partner: enrichPartner(result[1]),
      offers: enrichOffers(result[2]),
      proposals: enrichProposals(result[3]),
      contracts: enrichContracts(result[4]),
      offer: enrichOfferAllocation(result[5])
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}
