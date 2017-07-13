const registryGet = require('./registry/_get')

module.exports = function requires (name) {
  return function () {
    return registryGet(name)
  }
}
