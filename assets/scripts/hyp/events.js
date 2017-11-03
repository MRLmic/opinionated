const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const newArg = function () {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
  api.newArg(data)
    .then(ui.onNewArgSuccess)
    .then($(this).trigger('reset'))
    .catch(ui.onNewArgFailure)
}

const addHandlers = function () {
  $('#new-arg').on('submit', newArg)
}

module.exports = {
  addHandlers
}
