const test = require('tape')
const helper = require('./test_helper')

helper.setup((browser) => {
  test('Search for customer Peter Produkt', (t) => {
    t.plan(1)

    browser.visit('/').then(() => {
      browser.assert.success()
      return browser.fill('Suche', 'Produkt')
        .pressButton('Submit')
    }).then(() => {
      browser.assert.success()
      browser.assert.url({
        pathname: '/result',
        query: { query: 'Produkt' }
      })
      browser.assert.text('h1', "Suchergebnisse für 'Produkt'")
      let link = browser.queryAll('.onebox-results a').find((el) => {
        return browser.text('h3', el) === 'Herr Produkt, Peter'
      })
      return browser.click(link)
    }).then(() => {
      browser.assert.success()
      browser.assert.url({ pathname: '/partners/4711' })
      browser.assert.text('.p-name', 'Herr Peter Produkt')
      t.pass('Found correct partner page')
    })
  })
})

test.onFinish(helper.teardown)
