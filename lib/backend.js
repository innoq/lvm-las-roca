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

exports.household = (id) => {
  return request({ path: `/partner/${id}/haushalt` }, null)
}

exports.contracts = (id) => {
  return request({ path: `/vertraege?partnerId=${id}` }, null)
}
