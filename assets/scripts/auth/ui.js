const store = require('../store')
const hypsHandles = require('./../templates/helpers/single-hyp.handlebars')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./../hyp/ui')
const api = require('./../hyp/api')

const signUpSuccess = function (data) {
  $('#su-modal').modal('toggle')
  $('body').removeClass('modal-open')
  $('.bubble').fadeIn().text('Account created! Please sign in.').animate({opacity: 1}).delay(550).animate({opacity: 0})
  $('.modal-backdrop').remove()
  $('.form-signup').trigger('reset')
}

const signInSuccess = function (data) {
  store.user = data.user
  store.token = data.token
  store.id = data.user.id
  $('#change-password').show()
  $('#SIbutton').hide()
  $('#SUbutton').hide()
  $('#sign-out').show()
  $('.modal-backdrop').remove()
  $('body').removeClass('modal-open')
  $('.bubble').fadeIn().text('WELCOME').animate({opacity: 1}).delay(550).animate({opacity: 0})
  $('.form-signin').trigger('reset')
  $('#si-modal').modal('toggle')
  $('#new-arg').hide()
  $('.arg-feed-wrapper').hide()
  $('#new-hyp').show()
  $('#home').hide()
  $('.hyp-wrapper').show()
  api.getHyps()
    .then(ui.onGetHSuccess)
}

const changePasswordSuccess = function (data) {
  $('#change-password').trigger('reset')
  $('#change-modal').modal('toggle')
  $('.bubble').fadeIn().text('Password Changed').animate({opacity: 1}).delay(550).animate({opacity: 0})
}

const signOutSuccess = function () {
  $('#sign-out').hide()
  store.user = null
  store.data = null
  // store.user.id = null
  $('.bubble').fadeIn().text('Signed Out').animate({opacity: 1}).delay(550).animate({opacity: 0})
  $('#SIbutton').show()
  $('#SUbutton').show()
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
  $('#su-modal').modal('toggle')
  $('.form-signup').trigger('reset')
  $('.bubble').fadeIn().text('Issue on Sign Up, Try Again').animate({opacity: 1}).delay(550).animate({opacity: 0})
}

const signInFailure = function (data) {
  $('.form-signin').trigger('reset')
  $('#si-modal').modal('toggle')
  $('.bubble').fadeIn().text('try again!').animate({opacity: 1}).delay(550).animate({opacity: 0})
}

const changePasswordFailure = function (data) {
  $('#change-password').trigger('reset')
  $('#change-modal').modal('toggle')
  $('.bubble').fadeIn().text('Password Change Failed, Try Again').animate({opacity: 1}).delay(550).animate({opacity: 0})
}
const signOutFailure = function (data) {
  $('.bubble').text('You have not signed out!').fadeIn().animate({opacity: 1}).delay(550).animate({opacity: 0})
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
