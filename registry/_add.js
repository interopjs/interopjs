const registry = require('./.')

module.exports = function add (name, implementation) {
  if (!(name in registry)) {
    registry[name] = []
  }
  registry[name].push(implementation)
}
