const branches = require('./data/branches')
const contactTypes = require('./data/contact_types')

const findIconForBranch = (label) => {
  return branches.find((branch) => branch.label === label).icon
}

exports.enrichHousehold = (people) => {
  return people.map((person) => {
    let name = person.name

    if (person.hasOwnProperty('vorname')) {
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

exports.enrichContracts = (contracts) => {
  return contracts.map((contract) => {
    return Object.assign({}, contract, {
      beitrag: formatMoney(contract.beitragZent),
      icon: findIconForBranch(contract.sparte)
    })
  })
}

exports.enrichContacts = (contacts) => {
  return contacts.map((contact) => {
    return Object.assign({}, contact, {
      icon: contactTypes[contact.kontaktart]
    })
  })
}

exports.enrichBranches = (branches, contracts) => {
  return branches.map((branch) => {
    let contractsForBranch = contracts.filter((contract) => contract.sparte === branch.label)
    return Object.assign({}, branch, {
      numberOfContracts: contractsForBranch.length
    })
  })
}
