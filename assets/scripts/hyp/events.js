const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

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

const addHandlers = function () {
  $('#new-arg').on('submit', newArg)
  $('#show-arg').on('click', showArguments)
  $('.arg-feed').on('click', deleteArgument)
}

module.exports = {
  addHandlers
}
