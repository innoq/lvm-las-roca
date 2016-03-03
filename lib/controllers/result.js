const backend = require('../backend')

exports.get = (req, res) => {
  let query = req.query['query']
  backend.findPartner(query).then((result) => {
    let foundPartners = result.map((el) => {
      return {
        url: `/partners/${el.partnerId}`,
        honorific: el.anrede,
        name: el.name,
        address: el.anschrift,
        dob: el.geburtsdatum,
        age: 42 // TODO: add age calculation
      }
    })

    res.render('search_results', {
      results: foundPartners,
      query: query
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
}
