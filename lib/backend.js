const http = require('http')

const defaults = {
  port: 5100,
  method: 'GET'
}

const request = (opts, postData) => {
  const options = Object.assign({}, defaults, opts)

  return new Promise((resolve, reject) => {
    let req = http.request(options, (res) => {
      if (res.statusCode.toString()[0] === '2') {
        res.on('data', (b) => resolve(JSON.parse(b)))
      } else {
        reject(`Unexpected Status Code ${res.statusCode}`)
      }
    })

    req.on('error', reject)

    if (postData) {
      req.write(postData)
    }

    req.end()
  })
}

exports.household = (id) => request({ path: `/partner/${id}/haushalt` })
exports.contracts = (id) => request({ path: `/vertraege?partnerId=${id}` })
exports.proposals = (id) => request({ path: `/antraege?partnerId=${id}` })
exports.offers = (id) => request({ path: `/angebote?partnerId=${id}` })
exports.findPartner = (query) => request({ path: `/partner?q=${query}` })
exports.partner = (id) => request({ path: `/partner/${id}` })
exports.contacts = (id) => request({ path: `/partner/${id}/kontakt` })
