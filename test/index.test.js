require('mocha')
const expect = require('chai').expect
const interop = require('../.')

function reset (obj) {
  for (let prop in obj) {
    delete obj[prop]
  }
}
describe('interopjs', () => {
  const implementation = () => {}
  afterEach(() => {
    reset(interop.registry)
  })

  describe('implements', () =>  {
    it('throws on invalid args', () => {
      expect(() => interop.implements('foo', implementation))
        .to.throw('interopjs E1002 ArgumentError: must be called with exactly `implements(name: string)`')
    })
    it('adds an implementation', () => {
      interop.implements('foo')(implementation)
      expect(interop.registry.foo[0])
        .to.equal(implementation)
    })
  })

  describe('requires', () => {
    describe('when implemented', () => {
      beforeEach(() => {
        interop.implements('foo')(implementation)
      })
      it('returns the thunked implementation', () => {
        expect(interop.requires('foo')())
          .to.equal(implementation)
      })
    })
    describe('when not implemented', () => {
      it('throws NotImplemented', () => {
        expect(() => interop.requires('foo')())
          .to.throw(/interopjs E1001 NotImplemented: foo/)
      })
    })
  })
})
