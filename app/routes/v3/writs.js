const settings = require('./config')

module.exports = function (router) {
  const version = 'v3'
  router.get(['/' + version + '/writs/'], function (req, res) {
    res.render('writs/amount-to-enforce.html')
  })
  router.get(['/' + version + '/writs/payment'], function (req, res) {
    res.redirect('/' + version + '/GOVUK-pay/enter-card?continueUrl=/' + version + '/writs/confirmation-page')
  })
  router.post(['/' + version + '/writs/'], function (req, res) {
    res.redirect('/' + version + '/writs/select-hceo')
  })
  router.post(['/' + version + '/writs/select-hceo'], function (req, res) {
    res.redirect('/' + version + '/writs/debtor-details')
  })
  router.post(['/' + version + '/writs/debtor-details'], function (req, res) {
    res.redirect('/' + version + '/writs/check-answers')
  })

  router.get(['/' + version + '/check-writ/', '/' + version + '/check-writ'], function (req, res) {
    res.render(version + '/check-writ/start.html')
  })

  router.get(['/' + version + '/check-writ/questions'], function (req, res) {
    res.render(version + '/check-writ/index.html')
  })

  router.get(['/' + version + '/writs/cmc/5'], function (req, res) {
    let sess = req.session
    let amount = sess.amount ? sess.amount : settings.claimAmount
    res.render(version + '/writs/cmc/5.html', {
      amount: parseFloat(amount) + 66
    })
  })

  router.post(['/' + version + '/check-writ/questions'], function (req, res) {
    // res.render(version + 'check-writ/index.html', {
    //   d: 'asd'
    // })
    res.redirect('/' + version + '/check-writ/confirmation-page')
  })

  router.get(['/' + version + '/stay-writ/2'], function (req, res) {
    res.render(version + '/stay-writ/hearing.html')
  })

  router.get(['/' + version + '/stay-writ/3'], function (req, res) {
    res.render(version + '/stay-writ/why.html')
  })

  router.get(['/' + version + '/stay-writ/4'], function (req, res) {
    res.render(version + '/stay-writ/evidence.html')
  })

  router.get(['/' + version + '/stay-writ/payment'], function (req, res) {
    res.redirect('/' + version + '/GOVUK-pay/enter-card?continueUrl=/' + version + '/stay-writ/confirmation-page&amount=' + settings.feeStayOfWrit)
  })

  router.get(['/' + version + '/stay-writ/confirmation-page'], function (req, res) {
    let simulateTimePassing = req.query.simulateTimePassing || false
    res.render(version + '/stay-writ/confirmation-page.html', {
      simulateTimePassing: simulateTimePassing
    })
  })
}
