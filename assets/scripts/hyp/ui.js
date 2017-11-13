const store = require('../store')
const argHandles = require('./../templates/helpers/arguments.handlebars')
const api = require('./api.js')
const hypsHandles = require('./../templates/helpers/single-hyp.handlebars')
const hypHandle = require('./../templates/helpers/one-hyp.handlebars')

// Hypotheses UI
const onNewHypSuccess = function (data) {
  store.hypotheses = data.hypotheses
  api.getHyps()
    .then(onGetHSuccess)
    .then(() => { window.scrollTo(0, document.body.scrollHeight) })
  $('#new-hyp').trigger('reset')
}

const onGetHSuccess = function (data) {
  $('.hyp-feed').text('')
  let hypsHTML = hypsHandles({hypotheses: data.hypotheses})
  $('.hyp-feed').append(hypsHTML)
  for (let i = 0; i < data.hypotheses.length; i++) {
    if (store.user.id !== data.hypotheses[i].user_id) {
      $(`[data-id="${data.hypotheses[i].id}"].button-group`).hide()
    } else {
      $(`[data-id="${data.hypotheses[i].id}"].button-group`).show()
    }
  }
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

// Arg Functions
const onNewArgSuccess = function (data) {
  store.arguments = data.arguments
  api.getArgs()
    .then(onGetSuccess)
    .then(() => { window.scrollTo(0, document.body.scrollHeight) })
}

// Get Arguments
const onGetSuccess = function (data) {
  $('.arg-feed').text('')
  let argHTML = argHandles({arguments: data.arguments})
  $('.arg-feed').append(argHTML)
  for (let i = 0; i < data.arguments.length; i++) {
    let el = document.getElementById('current-hyp')
    let hypothesisId = el.getAttribute('data-id')
    if (data.arguments[i].hypothesis_id == hypothesisId) {
      $(`[data-id="${data.arguments[i].id}"].pro-point`).show()
      $(`[data-id="${data.arguments[i].id}"].con-point`).show()
    } else {
      $(`[data-id="${data.arguments[i].id}"].pro-point`).hide()
      $(`[data-id="${data.arguments[i].id}"].con-point`).hide()
    }
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
}

const onDeleteArgSuccess = function (data) {
  $('.bubble').text('Argument Retracted').animate({opacity: 1}).delay(550).animate({opacity: 0})
  api.getArgs()
    .then(onGetSuccess)
}

const onDeleteArgFailure = function (data) {
  $('.bubble').text('The Internet is Forever. There was a problem 📢').animate({opacity: 1}).delay(550).animate({opacity: 0})
}

module.exports = {
  onNewArgSuccess,
  onGetSuccess,
  onDeleteArgSuccess,
  onDeleteArgFailure,
  onNewHypSuccess,
  onGetHSuccess,
  onOneSuccess
}
