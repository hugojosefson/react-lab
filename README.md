# React Lab

A lab on the basics of [React](http://facebook.github.io/react/).

## Getting Started

Clone the repository:

    git clone git@github.com:jayway/react-lab.git

If you don't have Node (requires [Homebrew](http://brew.sh)):

    brew install node

Install the JSX transformer:

    npm install -g react-tools

Install a simple web server:

    npm install -g http-server

Finally:

    http-server
    jsx src dist --watch --extension jsx
    open http://localhost:8080

## Objective

Create a (very) lightweight [SCRUM](http://en.wikipedia.org/wiki/Scrum_(software_development)) board.

See the [blueprint](https://github.com/jayway/react-lab/blob/master/blueprint.html) for target markup. CSS is provided, but feel free to modify as needed.

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
