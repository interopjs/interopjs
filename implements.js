const registryAdd = require('./registry/_add')
const errors = require('./errors')

module.exports = function implements (name) {
  if (arguments.length !== 1 || typeof name !== 'string') {
    throw new errors.ArgumentError('must be called with exactly `implements(name: string)`')
  }
  return function (implementation) {
    registryAdd(name, implementation)
  }
}
