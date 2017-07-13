# interopjs

programs are conversations between modules

## manifesto

The biggest advances in programming in recent time have nothing to do with technology.

The most successful programming communities have been the most social.

The most widely used programming languages and platforms are the ones which let
people express the programs they want to make in the most direct way possible.

Form JavaScript to PHP, Python to R - in every case, they have active communities building
useful things and sharing their code.

**Programs are conversations between modules**

## how interopjs facilitates conversations for better programs, in plain language

People (and programs) can have conversations more easily if they can agree on
common terms.

Often, this is done by separating programs into *packages* and coordinated using *package managers*, like [`npm`][npm].

Conversations can also be thought of as relationships.

A package manager allows you to express one kind of relationship, and it's quite needy: my program `<depends on>` another program.

Sometimes, my program's needs are more general. I don't need this specific cacheing program, I just need something that is like a cache. I don't need ice cream from this particular store, I'd just like it to be mango ice cream. No matter which package it comes from, my program will be happy with some cache program that lets it get and set from a cache.

A clever computer scientist named Barbara Liskov observed this back in the 1980s, and it became known as the [Liskov Substitution Principle][lsp]. Certain components in a software program can be replaced by other components, as long as they provide the same properties.

As programmers, we can cooperate more easily and create better programs together if we can express relationships other than `a <depends on> b`.

`interopjs` provides two new relationships: `m <requires> n` and `x <implements> y`.

If `a <requires> q`, and `r <implements> q` and `s <implements> q`, then as long a someone comes along to make a match, `a` can have a conversation with either `r` or `s` - and another programmer can come along and make a program `t` where `t <implements> q`, and know that it will work with `a`!

`interopjs` acts as that matchmaker, and will help you create programs which *interoperate* - that is, which *work together* - with other programs. I hope you give it a try - you might find it as natural as `npm install` ing a package. 

## how to use `interopjs`

In this walkthrough, we'll talk about a program `A` which wants to send a chat message to a person named Eli to wish them happy birthday.

The common chat protocol is `B`, and looking on `npm` there are several packages which implement `B`, named `X` and `Y`.

Recall that, for a module `A`, the direct `A <depends on> X` relationship is expressed in commonjs as:
```js
const X = require('X')
X.sendMessage('eli2938', 'happy birthday!')
```
or in es2015 as:
```js
import X from 'X'
X.sendMessage('eli2938', 'happy birthday!')
```

With `interopjs`, `A` can use either `X` or `Y` - and it will be forwards compatible when someone comes along and writes `Z` with newer and better features. What they have in common is that they all `<implement>` `B`.

Let's look at `A` in commonjs:
```js
const B = require('@requires/b)
B.sendMessage('eli2938', 'happy birthday!')
```

To implement `B` is also simple:
```js
require('@implements/b)
```

So in the relationship `A <requires> B <implemented by> Z`, the common point is `B` - which is just an npm package! `B` is called an [`interface`][interface]. For every interface,
there are two corresponding npm packages: `@requires/b` and `@implements/b`, which are published automatically when your pull request is merged on the `interopjs/interfaces` repo.


## about the design
Dependencies (either direct or indirect, as offered by `interopjs`) between packages form a [graph][graph] - a network between packages. In order to understand the entire program, a human programmer has to be able to navigate this graph. npm makes this easy by providing links between packages and their direct dependencies, both on the npmjs.com website and via package.json files. `interopjs` expresses indirect dependencies through a common npm namespace. This means, from a program `A` which `<requires>` interface `B`, we can see that `A` has a direct npm dependency on `@requires/b` - and then we can see the things which implement `B` by looking at the modules which `<depend on>` `@implements/b`.

## for interface maintainers
This spec is pre-1.0.0 and is subject to change.

Every interface `B` has two packages, a `@requires/b` and an `@implements/b` package. These interfaces must follow strict Semantic Versioning, and changes are subject to manual review. <More about expectations and requirements to come>.

### sample `@requires/b`
```js
const interopjs = require('interopjs')
module.exports = interopjs.requires('b')
```

### sample `@implements/b`
```js
const interopjs = require('interopjs')
module.exports = interopjs.implements('b')
```

Both of these files are automatically generated based on the interface name (and possibly some other metadata in the future).

### sample `X <implements> B`
```js
const define = require('@implements/b')
define(function () {
  return 'hello'
})
```

### sample `A <requires> B`
```js
const b = require('@requires/b')
console.log(b())
```

## how a program discovers implementers at runtime
<to come> how everything is wired up

## license
This repo is licensed as CC-0.

[npm]: https://npmjs.com
[lsp]: https://en.wikipedia.org/wiki/Liskov_substitution_principle
[interface]: https://en.wikipedia.org/wiki/Interface_(computing)
[graph]: https://en.wikipedia.org/wiki/Graph_(abstract_data_type)