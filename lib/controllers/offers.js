const backend = require('../backend')
const branches = require('../data/branches')
const enrichBranches = require('../enricher').enrichBranches
const enrichPartner = require('../enricher').enrichPartner
const enrichOffers = require('../enricher').enrichOffers
const enrichOffer = require('../enricher').enrichOffer
const enrichProposals = require('../enricher').enrichProposals
const enrichContracts = require('../enricher').enrichContracts
const enrichOfferAllocation = require('../enricher').enrichOfferAllocation
const enrichOfferCalculation = require('../enricher').enrichOfferCalculation
const expandErrors = require('../expand_errors')

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

exports.calc = (req, res) => {
  let stringifiedReqBody = JSON.stringify(req.body)
  Promise.all([
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.offers(req.params.id),
    backend.proposals(req.params.id),
    backend.contracts(req.params.id),
    backend.offerCalculation(stringifiedReqBody)
  ]).then((result) => {
    let offer = enrichOfferCalculation(result[5], req.body)

    res.render('offers/new', {
      errors: expandErrors(offer),
      branches: enrichBranches(branches, result[0]),
      partner: enrichPartner(result[1]),
      offers: enrichOffers(result[2]),
      proposals: enrichProposals(result[3]),
      contracts: enrichContracts(result[4]),
      offer: offer
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}

exports.copy = (req, res) => {
  backend.copyOffer(req.params.offer_id).then((result) => {
    let newOffer = enrichOffer(result)
    let newOfferUri = newOffer.offerEditUri
    res.redirect(303, newOfferUri)
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}
