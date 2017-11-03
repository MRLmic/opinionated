const store = require('../store')

const onNewArgSuccess = function (data) {
  console.log('success')
  console.log(data)
}

const onNewArgFailure = function (data) {
  console.log('failure')
}

module.exports = {
  onNewArgSuccess,
  onNewArgFailure
}
