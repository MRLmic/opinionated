const store = require('../store')
const hypsHandles = require('./../templates/helpers/single-hyp.handlebars')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./../hyp/ui')
const api = require('./../hyp/api')

const signUpSuccess = function (data) {
  // console.log(data)
  // console.log('Successfully signed up!')
  $('.message').fadeIn().text('Success!').animate({opacity: 1}).delay(550).animate({opacity: 0})
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
  $('.form-signin').trigger('reset')
}

const signInSuccess = function (data) {
  store.user = data.user
  store.token = data.token
  $('#change-password').show()
  $('#SIbutton').hide()
  $('#SUbutton').hide()
  $('#sign-out').show()
  $('.modal-backdrop').remove()
  $('body').removeClass('modal-open')
  $('.message').fadeIn().text('Signed In').delay(550).fadeOut()
  $('.form-signin').trigger('reset')
  $('#new-arg').hide()
  $('.arg-feed-wrapper').hide()
  $('#new-hyp').show()
  $('#home').hide()
  $('.hyp-wrapper').show()
  api.getHyps()
    .then(ui.onGetHSuccess)
}

const changePasswordSuccess = function (data) {
  // console.log('Great success!')
  $('#change-password').trigger('reset')
  $('.message').fadeIn().text('PW Changed').animate({opacity: 1}).delay(550).animate({opacity: 0})
}

const signOutSuccess = function () {
  $('#sign-out').hide()
  store.user = null
  store.data = null
  store.user.id = null
  $('.message').fadeIn().text('Signed Out!').animate({opacity: 1}).delay(550).animate({opacity: 0})
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-password').hide()
  $('.arg-feed-wrapper').hide()
  $('#new-hyp').hide()
  $('#new-arg').hide()
  $('.hyp-wrapper').hide()
  $('#SIbutton').show()
  $('#SUbutton').show()
  $('#home').hide()
  $('.single').hide()
  $('.arg-feed').text('')
  $('.single').text('')
}

const signUpFailure = function (data) {
  // console.error(data)
  $('#SU').fadeIn().text('Issue on Sign Up, Try Again').animate({opacity: 1}).delay(550).animate({opacity: 0})
}
const signInFailure = function (data) {
  // console.log(data)
  // console.log('failure!')
  $('.message').text('try again!')
}
const changePasswordFailure = function (data) {
  // console.log(data)
  // console.log('FAIL!')
$('#SU').fadeIn().text('Success!').animate({opacity: 1}).delay(550).animate({opacity: 0})
}
const signOutFailure = function (data) {
  // console.log(data)
  // console.log('FAIL!')
  $('.message').text('You have not signed out!').fadeIn().delay(4000).fadeOut()
}
const failure = (data) => {
  // console.error(data)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  failure
}
