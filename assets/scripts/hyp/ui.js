const store = require('../store')
const argHandles = require('./../templates/helpers/arguments.handlebars')
const api = require('./api.js')
const hypsHandles = require('./../templates/helpers/single-hyp.handlebars')
const hypHandle = require('./../templates/helpers/one-hyp.handlebars')

// Hypotheses UI
const onNewHypSuccess = function (data) {
  console.log(data)
  store.hypotheses = data.hypotheses
  console.log(data.hypotheses + 'about to get')
  api.getHyps()
    .then(onGetHSuccess)
    .then(() => { window.scrollTo(0, document.body.scrollHeight) })
}

const onNewHypFailure = function (data) {
  console.log('fail new hyp')
}

const onGetHSuccess = function (data) {
  $('.hyp-feed').text('')
  let hypsHTML = hypsHandles({hypotheses: data.hypotheses})
  $('.hyp-feed').append(hypsHTML)
}

const onGetHFailure = function (data) {
  console.log('get hyps failure')
}

const onOneSuccess = function (data) {
  $('#new-arg').show()
  $('.arg-feed-wrapper').show()
  $('#new-hyp').hide()
  $('.hyp-wrapper').hide()
  $('.single').show()
  let hypHTML = hypHandle({hypothesis: data.hypothesis})
  $('.single').append(hypHTML)
  $('#home').show()
}

const onOneFailure = function (data) {
  console.log('get one failure')
}

// Arg Functions
const onNewArgSuccess = function (data) {
  console.log(data)
  store.arguments = data.arguments
  api.getArgs()
    .then(onGetSuccess)
    .then(() => { window.scrollTo(0, document.body.scrollHeight) })
}

const onNewArgFailure = function (data) {
  console.log('failure')
}

// Get Arguments
const onGetSuccess = function (data) {
  console.log(data.arguments)
  $('.arg-feed').text('')
  let argHTML = argHandles({arguments: data.arguments})
  $('.arg-feed').append(argHTML)
  for (let i = 0; i < data.arguments.length; i++) {
    if (store.user.id !== data.arguments[i].user_id) {
      $(`[data-id="${data.arguments[i].id}"].button-group`).hide()
    } else {
      $(`[data-id="${data.arguments[i].id}"].button-group`).show()
    }
  }
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' })
  })
}

const onGetFailure = function (data) {
  console.log('get failure')
}

const onDeleteArgSuccess = function (data) {
  $('.message').text('Argument Retracted 📢').animate({opacity: 1}).delay(550).animate({opacity: 0})
  api.getArgs()
    .then(onGetSuccess)
}

const onDeleteArgFailure = function (data) {
  $('.message').text('The Internet is Forever. There was a problem 📢').animate({opacity: 1}).delay(550).animate({opacity: 0})
}

module.exports = {
  onNewArgSuccess,
  onNewArgFailure,
  onGetSuccess,
  onGetFailure,
  onDeleteArgSuccess,
  onDeleteArgFailure,
  onNewHypSuccess,
  onNewHypFailure,
  onGetHFailure,
  onGetHSuccess,
  onOneSuccess,
  onOneFailure
}
