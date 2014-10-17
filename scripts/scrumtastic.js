/** @jsx React.DOM */

/* Components
 * ======================================================================== */

/* Wrapper */

React.renderComponent(
  <div className="page-wrap" />,
  document.querySelector('body')
);


/* Header */

var Header = React.createClass({
  render: function () {
    return (
      <header className="header" role="header">
        <h1>{this.props.title}</h1>
      </header>
    );
  }
});


/* Main */

var Main = React.createClass({
  render: function () {
    return (
      <main className="main" role="main">
        <ScrumBoard />
      </main>
    );
  }
});


/* Scrum Board */

var ScrumBoard = React.createClass({
  render: function () {
    var columns; // TODO
    return (
      <div className="scrum-board">
      </div>
    );
  }
});


/* Render
 * ======================================================================== */

/* Start rendering chain */

React.renderComponent(
  <div className="page-wrap">
    <Header title="SCRUMtastic" />
    <Main />
  </div>,
  document.querySelector('body')
);
