# React Lab

A lab on the basics of [React](http://facebook.github.io/react/).

## Requirements

* NodeJS 0.11.x
* Make
* [A browser that supports Promises](http://caniuse.com/#feat=promises).

## Getting Started

Clone and enter the repository:

    git clone git@github.com:jayway/react-lab.git
    cd react-lab

Build and watch for changes:

    make watch

This starts a server that hosts your app and the blueprint.

* Open http://localhost:8081/ to see your app.
* Open http://localhost:8081/blueprint.html to see the blueprint.

## Objective

Create a (very) light expense tracker app. We have created a mock backend API
that you can use to retrieve and store transactions with. There's also some CSS
ready that you can use if you follow the
[blueprint](https://github.com/jayway/react-lab/blob/master/blueprint.html).

You should be able to get all the existing transactions through `api.transactions.getAll()`
which returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
of an array of transactions.

When you have created the form you can add new transactions with
`api.transactions.add(transaction)`. See the `src/scripts/data.jsx` for the format
of the transactions.

When you're done you should be able to add new transactions to the list and see
the updated **Sum**.

## Useful Links

For this lab:

* [Getting Started](http://facebook.github.io/react/docs/getting-started.html)
* [Component Specs and Lifecycle](http://facebook.github.io/react/docs/component-specs.html)
* [HTML to JSX Compiler](http://facebook.github.io/react/html-jsx.html)
* [JSX to JS Compiler](http://facebook.github.io/react/jsx-compiler.html)

Further development:

* [JSXHint](https://github.com/STRML/JSXHint/)
* [Jest](https://facebook.github.io/jest/)
* [Reactify](https://www.npmjs.org/package/reactify)
