const registry = require('./.')
const errors = require('../errors')

function sample (arr) {
  const i = Math.floor(Math.random() * arr.length)
  return arr[i]
}

module.exports = function get (name) {
  const implementations = registry[name]
  if (!implementations || implementations.length == 0) {
    throw new errors.NotImplemented(name)
  }
  // naive first pass: get a random implementation
  // (this will change before 1.0.0 - don't rely on this behavior)
  return sample(implementations)
}
