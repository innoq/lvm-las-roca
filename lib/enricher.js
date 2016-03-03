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
    return {
      dob: person.geburtsdatum,
      name: name,
      relationship: person.beziehung
    }
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
    return {
      branch: contract.sparte,
      fee: contract.beitragZent,
      formattedFee: formatMoney(contract.beitragZent),
      icon: findIconForBranch(contract.sparte),
      uri: contract.vertragURI
    }
  })
}

exports.enrichContacts = (contacts) => {
  return contacts.map((contact) => {
    return {
      advisor: contact.sachbearbeiter,
      date: contact.zeit,
      icon: contactTypes[contact.kontaktart],
      title: contact.titel,
      type: contact.kontaktart
    }
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

exports.enrichPartners = (partners) => {
  return partners.map((partner) => {
    return {
      address: partner.anschrift,
      age: 42, // TODO: add age calculation
      dob: partner.geburtsdatum,
      honorific: partner.anrede,
      name: partner.name,
      url: `/partners/${partner.partnerId}`
    }
  })
}
