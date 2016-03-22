const branches = require('./data/branches')
const contactTypes = require('./data/contact_types')
const moment = require('moment')

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
      id: contract.vsnr,
      branch: contract.sparte,
      fee: contract.beitragZent,
      formattedFee: formatMoney(contract.beitragZent),
      icon: findIconForBranch(contract.sparte),
      contractUri: `/partners/${contract.partnerId}/contracts/${contract.vsnr}`
    }
  })
}

exports.enrichContract = (contract) => {
  return {
    id: contract.vsnr,
    branch: contract.sparte,
    fee: contract.beitragZent,
    formattedFee: formatMoney(contract.beitragZent),
    icon: findIconForBranch(contract.sparte),
    contractUri: `/partners/${contract.partnerId}/contracts/${contract.vsnr}`,
    // TODO: translate later, I keep these keys because it could be
    // difficult with error marker on validation errors
    fahrzeugdaten: {
      fahrzeugart: contract.fahrzeugdaten.fahrzeugart,
      kennzeichen: contract.fahrzeugdaten.kennzeichen,
      hsn: contract.fahrzeugdaten.hsn,
      typschl: contract.fahrzeugdaten.typschl,
      erstzulassung: contract.fahrzeugdaten.erstzulassung,
      fahrgestell: contract.fahrzeugdaten.fahrgestell,
      fahrzeugstaerkePS: contract.fahrzeugdaten.fahrzeugstaerkePS,
      austauschmotor: ((contract.fahrzeugdaten.austauschmotor === true) ? 'Ja' : 'Nein'),
      kennzeichenart: contract.fahrzeugdaten.kennzeichenart,
      wechselkennzeichen: ((contract.fahrzeugdaten.wechselkennzeichen === true) ? 'Ja' : 'Nein')
    },
    nutzung: {
      beliebigeFahrer: contract.nutzung.beliebigeFahrer,
      nachtAbstellplatz: contract.nutzung.nachtAbstellplatz,
      fahrleistungKm: contract.nutzung.fahrleistungKm,
      kilometerstand: contract.nutzung.kilometerstand,
      abweichenderFahrzeughalter: ((contract.fahrzeugdaten.abweichenderFahrzeughalter === true) ? 'Ja' : 'Nein'),
      nutzung: contract.nutzung.nutzung,
      selbstGenEigentum: ((contract.fahrzeugdaten.selbstGenEigentum === true) ? 'Ja' : 'Nein'),
      wohneigentumart: contract.nutzung.wohneigentumart
    },
    versSchutz: {
      haftpflichSFR: contract.versSchutz.haftpflichSFR,
      volkaskoSFR: contract.versSchutz.volkaskoSFR,
      tarifgruppe: contract.versSchutz.tarifgruppe,
      rahmenvertrag: contract.versSchutz.rahmenvertrag,
      versBeginn: contract.versSchutz.versBeginn,
      zahlungsweise: contract.versSchutz.zahlungsweise
    }
  }
}

exports.enrichProposals = (proposals) => {
  return proposals.map((proposal) => {
    return {
      branch: proposal.sparte,
      fee: proposal.beitragZent,
      formattedFee: formatMoney(proposal.beitragZent),
      icon: findIconForBranch(proposal.sparte),
      uri: proposal.antragURI
    }
  })
}

exports.enrichOffers = (offers) => {
  return offers.map((offer) => {
    return {
      id: offer.angebotId,
      agency: offer.agentur,
      branch: offer.sparte,
      claims: offer.schaeden,
      expire: offer.ablauf,
      fee: offer.beitragZent,
      formattedFee: formatMoney(offer.beitragZent),
      icon: findIconForBranch(offer.sparte),
      incident: offer.versichertist,
      paymentInterval: offer.zahlungsweise,
      role: offer.rolle,
      offerUri: `/partners/${offer.partnerId}/offers/${offer.angebotId}`
    }
  })
}

exports.enrichOffer = (offer) => {
  return {
    id: offer.angebotId,
    agency: offer.agentur,
    branch: offer.sparte,
    claims: offer.schaeden,
    expire: offer.ablauf,
    fee: offer.beitragZent,
    formattedFee: formatMoney(offer.beitragZent),
    icon: findIconForBranch(offer.sparte),
    incident: offer.versichertist,
    paymentInterval: offer.zahlungsweise,
    role: offer.rolle,
    offerUri: `/partners/${offer.partnerId}/offers/${offer.angebotId}`,
    offerEditUri: `/partners/${offer.partnerId}/offers/${offer.angebotId}/edit`,
    vehicleData: {
      vehicleType: offer.fahrzeugdaten.fahrzeugart,
      licensePlate: offer.fahrzeugdaten.kennzeichen,
      manufacturerNo: offer.fahrzeugdaten.hsn,
      typeKey: offer.fahrzeugdaten.typschl,
      registrationDate: offer.fahrzeugdaten.erstzulassung,
      identificationNumber: offer.fahrzeugdaten.fahrgestell,
      horsepower: offer.fahrzeugdaten.fahrzeugstaerkePS,
      changeableEngine: ((offer.fahrzeugdaten.austauschmotor === true) ? 'Ja' : 'Nein'),
      licensePlateType: offer.fahrzeugdaten.kennzeichenart,
      changeableLicensePlate: ((offer.fahrzeugdaten.wechselkennzeichen === true) ? 'Ja' : 'Nein')
    },
    usage: {
      anyDriver: offer.nutzung.beliebigeFahrer,
      nightlyPound: offer.nutzung.nachtAbstellplatz,
      drivingPerformance: offer.nutzung.fahrleistungKm,
      mileage: offer.nutzung.kilometerstand,
      differentVehicleOwner: ((offer.fahrzeugdaten.abweichenderFahrzeughalter === true) ? 'Ja' : 'Nein'),
      usage: offer.nutzung.nutzung,
      ownerOccupiedHome: ((offer.fahrzeugdaten.selbstGenEigentum === true) ? 'Ja' : 'Nein'),
      homeOwnershipType: offer.nutzung.wohneigentumart
    },
    insuranceCover: {
      liabilityDiscount: offer.versSchutz.haftpflichSFR,
      comprehensiveCoverDiscount: offer.versSchutz.volkaskoSFR,
      wageGroup: offer.versSchutz.tarifgruppe,
      basicAgreement: offer.versSchutz.rahmenvertrag,
      start: offer.versSchutz.versBeginn,
      paymentMethod: offer.versSchutz.zahlungsweise
    }
  }
}

exports.enrichOfferAllocation = (offerAllocation) => {
  return {
    insuranceCover: {
      availablePaymentMethods: offerAllocation.zahlungsweise
    }
  }
}

exports.enrichContacts = (contacts) => {
  return contacts.map((contact) => {
    return {
      advisor: contact.sachbearbeiter,
      date: contact.zeit,
      formattedDate: parseDate(contact.zeit, 'YYYY-MM-DD h:mm', 'de').format('LLLL'),
      icon: contactTypes[contact.kontaktart],
      title: contact.titel,
      type: contact.kontaktart
    }
  })
}

const parseDate = (dateString, pattern, locale) => {
  moment.locale('de')
  return moment(dateString, pattern)
}

exports.enrichBranches = (branches, contracts) => {
  return branches.map((branch) => {
    let contractsForBranch = contracts.filter((contract) => contract.sparte === branch.label)
    return Object.assign({}, branch, {
      numberOfContracts: contractsForBranch.length
    })
  })
}

const formatAddress = (address) => `${address.strasse}, ${address.plz} ${address.ort} ${address.stadtteil}`

exports.enrichPartners = (partners) => {
  return partners.map((partner) => {
    return {
      address: formatAddress(partner.anschrift),
      age: calculateAge(partner.geburtsdatum, 'DD.MM.YYYY', 'de'),
      dob: partner.geburtsdatum,
      honorific: partner.anrede,
      firstname: partner.vorname,
      name: partner.name,
      url: `/partners/${partner.partnerId}`
    }
  })
}

const calculateAge = (dateString, pattern, locale) => {
  let dob = parseDate(dateString, pattern, locale) // locale doesnt matter
  return moment().diff(dob, 'years')
}

exports.enrichPartner = (partner) => {
  return {
    address: {
      street: partner.anschrift.strasse,
      city: partner.anschrift.ort,
      postcode: partner.anschrift.plz,
      district: partner.anschrift.stadtteil
    },
    age: partner.alter,
    childrenCount: partner.anzahlKinder,
    dob: partner.geburtsdatum,
    firstName: partner.vorname,
    honorific: partner.anrede,
    job: partner.beruf,
    name: partner.name,
    phone: partner.telnummer,
    nationality: partner.familienstand,
    personalStatus: partner.familienstand,
    _links: {
      self: {href: `/partners/${partner.partnerId}`},
      offers: {href: `/partners/${partner.partnerId}/offers`},
      proposals: {href: `/partners/${partner.partnerId}/proposals`},
      contracts: {href: `/partners/${partner.partnerId}/contracts`}
    }
  }
}
