const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const hypHandle = require('./../templates/helpers/one-hyp.handlebars')
// Hypotheses Events
const newHyp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.newHyp(data)
    .then(ui.onNewHypSuccess)
}

const showHypotheses = function (event) {
  event.preventDefault()
  console.log('button cicked')
  api.getHyps()
    .then(ui.onGetHSuccess)
    .catch(ui.onGetHFailure)
}

const showHyp = function (event) {
  event.preventDefault()
  if ($(event.target).hasClass('hyp-select')) {
  let hypId = $(event.target).attr('data-id')
  console.log(hypId)
  api.getOne(hypId)
    .then(ui.onOneSuccess)
    .catch(ui.onOneFailure)
}
}

const deleteHyp = function (event) {
  event.preventDefault()
  if ($(event.target).closest('button').hasClass('btn-danger')|| $(event.target).hasClass('btn-danger')) {
    let hypId = $(event.target).closest('h3').attr('data-id')
    api.delHyps(hypId)
      .then(ui.onDeleteHypSuccess)
      .catch(ui.onDeleteHypFailure)
  } else if ($(event.target).closest('button').hasClass('edit')|| $(event.target).hasClass('edit')) {
    $(event.target).closest('button').toggleClass('edit btn-success btn-primary edits')
    $(event.target).closest('a').toggleClass('hyp-select')
    $(event.target).closest('h3').attr('contenteditable', 'true')
    $($(event.target).closest('h3')).on('keydown paste',
      function (event) {
        if ($(this).text().length === 140 && event.keyCode !== 8) {
          event.preventDefault()
        }
      })
  } else if ($(event.target).closest('button').hasClass('edits') || $(event.target).hasClass('edits')) {
    $(event.target).closest('button').toggleClass('edits edit btn-success btn-primary')
    $(event.target).closest('h3').attr('contenteditable', 'false')
    $(event.target).closest('a').toggleClass('hyp-select')
    let hypId = $(event.target).closest('h3').attr('data-id')
    let content = event.target.closest('h3').innerText
    api.edHyp(hypId, content)
  }
}

// Arguments Events
const newArg = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.newArg(data)
    .then(ui.onNewArgSuccess)
    .then($(this).trigger('reset'))
    .catch(ui.onNewArgFailure)
}

const showArguments = function (event) {
  event.preventDefault()
  api.getArgs()
    .then(ui.onGetSuccess)
    .catch(ui.onGetFailure)
}

const deleteArgument = function (event) {
  event.preventDefault()
  if ($(event.target).closest('button').hasClass('btn-danger')|| $(event.target).hasClass('btn-danger')) {
    let argId = $(event.target).closest('div').attr('data-id')
    api.delArgs(argId)
      .then(ui.onDeleteArgSuccess)
      .catch(ui.onDeleteArgFailure)
  } else if ($(event.target).closest('button').hasClass('edit')|| $(event.target).hasClass('edit')) {
    $(event.target).closest('button').toggleClass('edit btn-success btn-primary edits')
    $(event.target).closest('div').attr('contenteditable', 'true')
    $($(event.target).closest('div')).on('keydown paste',
      function (event) {
        if ($(this).text().length === 280 && event.keyCode !== 8) {
          event.preventDefault()
        }
      })
  } else if ($(event.target).closest('button').hasClass('edits') || $(event.target).hasClass('edits')) {
    $(event.target).closest('button').toggleClass('edits edit btn-success btn-primary')
    $(event.target).closest('div').attr('contenteditable', 'false')
    let argId = $(event.target).closest('div').attr('data-id')
    let content = event.target.closest('div').firstChild.textContent
    api.edArg(argId, content)
  }
}

const homePage = function () {
  $('#new-arg').hide()
  $('.arg-feed-wrapper').hide()
  $('.arg-feed').text('')
  $('#new-hyp').show()
  $('#home').hide()
  $('.hyp-wrapper').show()
  $('.single').text('')
  $('.single').hide()
  $('.hyp-feed').show()
  api.getHyps()
    .then(ui.onGetHSuccess)
}
const addHandlers = function () {
  $('#new-arg').on('submit', newArg)
  $('#show-arg').on('click', showArguments)
  $('.arg-feed').on('click', deleteArgument)
  $('#new-hyp').on('submit', newHyp)
  $('.hyp-feed').on('click', deleteHyp)
  $('.hyp-feed').on('click', showHyp)
  $('#home').on('click', homePage)
}

module.exports = {
  addHandlers
}
