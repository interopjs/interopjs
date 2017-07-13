const inherits = require('util').inherits

inherits(InteropError, Error)
function InteropError (code, message) {
  this.name = this.constructor.name
  this.message = 'interopjs ' + code + ' ' + this.name + ': ' + message
  this.code = code;
}

function err(x) {
  module.exports[x.name] = x
  inherits(x, InteropError)
}

err(NotImplemented)
function NotImplemented(name) {
  InteropError.call(this, 'E1001', name)
  Error.captureStackTrace(this, this.constructor)
}

err(ArgumentError)
function ArgumentError(name) {
  InteropError.call(this, 'E1002', name)
  Error.captureStackTrace(this, this.constructor)
}