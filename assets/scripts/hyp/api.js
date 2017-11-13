'use strict'
const config = require('../config')
const store = require('../store')

// Hyp Calls
const newHyp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/hypotheses',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getHyps = function () {
  return $.ajax({
    url: config.apiOrigin + '/hypotheses',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getOne = function (hypId) {
  return $.ajax({
    url: config.apiOrigin + '/hypotheses/' + hypId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const delHyps = function (hypId) {
  return $.ajax({
    url: config.apiOrigin + '/hypotheses/' + hypId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const edHyp = function (hypId, content) {
  return $.ajax({
    url: config.apiOrigin + '/hypotheses/' + hypId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      hypothesis: {
        title: content
      }
    }
  })
}

// Argument Calls
const newArg = function (content, position, hypothesisId) {
  return $.ajax({
    url: config.apiOrigin + '/arguments',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      argument: {
        content: content,
        position: position,
        hypothesis_id: hypothesisId
      }
    }
  })
}

const getArgs = function () {
  return $.ajax({
    url: config.apiOrigin + '/arguments',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const delArgs = function (argId) {
  return $.ajax({
    url: config.apiOrigin + '/arguments/' + argId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const edArg = function (argId, content) {
  return $.ajax({
    url: config.apiOrigin + '/arguments/' + argId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
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
  edArg,
  getHyps,
  newHyp,
  delHyps,
  edHyp,
  getOne
}
