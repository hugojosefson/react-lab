# React Lab

A lab on the basics of [React](http://facebook.github.io/react/).

## Requirements

* NodeJS 0.11.x
* Make
* [A browser that supports Promises](http://caniuse.com/#feat=promises).

## Getting Started

Clone and enter the repository:

```bash
git clone git@github.com:jayway/react-lab.git
cd react-lab
```

Build and watch for changes:

```bash
make watch # builds and starts a server
google-chrome http://localhost:8080 # opens the app
google-chrome http://localhost:8080/blueprint.html # opens the blueprint
```

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

### Tasks

* Display all existing transactions in the table.
* Display a summary row in the bottom of the table.
* Make it possible to add new transactions (the summary row should update).

### Extras

*Something for the over-achievers...*

* Sort the transactions by `transaction.date` (ascending).
* Validate input and reflect errors in UI somehow.
* Make it possible to delete transactions.

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
