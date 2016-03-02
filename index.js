const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const backend = require('./lib/backend')

const branches = [
  { label: "Fonds", classname: "fonds" },
  { label: "Finanzen", classname: "finanzen" },
  { label: "Leben", classname: "leben" },
  { label: "Kranken", classname: "kranken" },
  { label: "Unfall", classname: "unfall" },
  { label: "Haftpflicht", classname: "haftpflicht" },
  { label: "Sach", classname: "sach" },
  { label: "Recht", classname: "recht" },
  { label: "Kraftfahrt", classname: "kfz", icon: "icon-car-2-filled" }
]

const findIconForBranch = (label) => {
  return branches.find((branch) => branch.label == label).icon
}

const contactTypes = {
  Email: "icon-mail-2-filled",
  Telefon: "icon-call-1-filled"
}

const enrichHousehold = (people) => {
  return people.map((person) => {
    let name = person.name

    if (person.hasOwnProperty("vorname")) {
      name = `${person.vorname} ${person.name}`
    }
    return Object.assign({}, person, {
      name: name
    })
  })
}

const formatMoney = (amount) => {
  let euros = Math.floor(amount / 100)
  let cents = amount % 100
  if (cents < 10) {
    cents = `0${cents}`
  }
  return `${euros},${cents} €`
}

const enrichContracts = (contracts) => {
  return contracts.map((contract) => {
    return Object.assign({}, contract, {
      beitrag: formatMoney(contract.beitragZent),
      icon: findIconForBranch(contract.sparte)
    })
  })
}

const enrichContacts = (contacts) => {
  return contacts.map((contact) => {
    return Object.assign({}, contact, {
      icon: contactTypes[contact.kontaktart]
    })
  })
}

// Set up Mustache as the view engine
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.set('layout', 'layout')

// Mount the assets
app.use('/assets', express.static('public'))

app.get('/', (req, res) => {
  res.render('search', {})
})

app.get('/result', (req, res) => {
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
})

app.get('/partners/:id', (req, res) => {
  Promise.all([
    backend.household(req.params.id),
    backend.contracts(req.params.id),
    backend.partner(req.params.id),
    backend.contacts(req.params.id)
  ]).then((result) => {
    res.render('partners', {
      branches: branches,
      household: enrichHousehold(result[0]),
      contracts: enrichContracts(result[1]),
      partner: result[2],
      contacts: enrichContacts(result[3])
    })
  }, (err) => {
    // TODO: Add an error page template
    res.send(`An error occurred: ${err}`)
  })
})

app.listen(8080, () => console.log('Listening on port 8080!'))
