const store = require('../store')
const argHandles = require('./../templates/helpers/arguments.handlebars')
const api = require('./api.js')

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

const onGetSuccess = function (data) {
  console.log(data.arguments)
  $('.arg-feed').text('')
  let argHTML = argHandles({arguments: data.arguments})
  $('.arg-feed').append(argHTML)
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
  onDeleteArgFailure
}
