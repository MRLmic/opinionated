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

const getArgs = function () {
  return $.ajax({
    url: config.apiOrigin + '/arguments',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}

const delArgs = function (argId) {
  return $.ajax({
    url: config.apiOrigin + '/arguments/' + argId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}

const edArg = function (argId, content) {
  return $.ajax({
    url: config.apiOrigin + '/arguments/' + argId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data: {
      argument: {
        content: content
      }
    }
  })
}

module.exports = {
  newArg,
  getArgs,
  delArgs,
  edArg
}
