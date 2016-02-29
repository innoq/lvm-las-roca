const http = require('http')

const defaults = {
  port: 5100,
  method: 'GET'
}

const request = (opts, postData, cb) => {
  let options = Object.assign({}, defaults, opts)

  let req = http.request(options, (res) => {
    if (res.statusCode.toString()[0] === '2') {
      res.on('data', (b) => cb(null, JSON.parse(b)))
    } else {
      cb(`Unexpected Status Code ${res.statusCode}`)
    }
  })

  req.on('error', cb)

  if (postData) {
    req.write(postData)
  }

  req.end()
}

exports.household = (id, cb) => {
  request({ path: `/partner/${id}/haushalt` }, null, cb)
}

exports.contracts = (id, cb) => {
  request({ path: `/vertraege?partnerId=${id}` }, null, cb)
}
