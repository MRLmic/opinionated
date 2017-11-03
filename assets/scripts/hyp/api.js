'use strict'
const config = require('../config')
const store = require('../store')

const newArg = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/arguments',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data
  })
}

module.exports = {
  newArg
}
