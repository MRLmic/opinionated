'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const ui = require('./auth/ui')
const authEvents = require('./auth/events')
const hypEvents = require('./hyp/events')
$(() => {
  setAPIOrigin(location, config)
  $().button('toggle')
})

$(() => {
  authEvents.addHandlers()
  hypEvents.addHandlers()
})
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
