const store = require('../store')
// const showNotesTemplate = require('../templates/note-listing.handlebars')
// const getFormFields = require('../../../lib/get-form-fields')

const signUpSuccess = function (data) {
  // console.log(data)
  // console.log('Successfully signed up!')
  $('#SU').text('Success!').delay(550).fadeOut()
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
}

const signInSuccess = function (data) {
  // console.log(data)
  // console.log('Successfully signed in!')
  store.user = data.user
  $('#SIbutton').hide()
  $('#SUbutton').hide()
  $('#SI').text('Signed In').delay(550).fadeOut()
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
}

const changePasswordSuccess = function (data) {
  // console.log('Great success!')
  $('#change-password').trigger('reset')
  $('#message').text('You`ve successfully changed your password!').fadeIn().delay(4000).fadeOut()
}

const signOutSuccess = function () {
  $('#sign-out').hide()
  store.user = null
  store.data = null
  store.surveys = null
  $('#message').text('You`ve successfully signed out!').fadeIn().delay(4000).fadeOut()
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-password').hide()
  $('.feed').text(null)
  $('.feed').hide()
  $('.dash').hide()
  $('.update-survey').hide()
  $('.feed-btns').hide()
  $('.get-surveys').hide()
}

const signUpFailure = function (data) {
  // console.error(data)
  $('#message').text('Issue on sign-up! Try again!').fadeIn().delay(4000).fadeOut()
}
const signInFailure = function (data) {
  // console.log(data)
  // console.log('failure!')
  $('#message').text('try again!')
}
const changePasswordFailure = function (data) {
  // console.log(data)
  // console.log('FAIL!')
  $('#message').text('Something went wrong, change password!').fadeIn().delay(4000).fadeOut()
}
const signOutFailure = function (data) {
  // console.log(data)
  // console.log('FAIL!')
  $('#message').text('You have not signed out!').fadeIn().delay(4000).fadeOut()
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
