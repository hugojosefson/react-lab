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
        <ScrumBoard url="/data/columns.json" />
      </main>
    );
  }
});


/* Scrum Board */

var ScrumBoard = React.createClass({
  loadColumns: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (data) {
        this.setState({columns: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {
      columns: []
    };
  },
  componentDidMount: function () {
    this.loadColumns();
  },
  render: function () {
    var columns = this.state.columns.map(function (column) {
      return (
        <Column key={column.id} id={column.id} title={column.title} url="/data/tasks.json" />
      );
    });

    return (
      <div className="scrum-board">
        {columns}
      </div>
    );
  }
});


/* Column */

var Column = React.createClass({
  loadTasks: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (data) {
        this.setState({tasks: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {
      tasks: []
    };
  },
  componentDidMount: function () {
    this.loadTasks();
  },
  render: function () {
    var self = this;

    var tasks = this.state.tasks.map(function (task) {
      if (task.columnId === self.props.id) {
        return (
          <Task key={task.id} id={task.id} description={task.description} />
        );
      }
    });

    return (
      <div className="column">
        <h3>{this.props.title}</h3>
        <div className="tasks">
          {tasks}
        </div>
      </div>
    );
  }
});


/* Task */

var Task = React.createClass({
  getInitialState: function () {
    return {
      editable: false
    };
  },
  toggleEdit: function (edit) {
    console.log(edit);
    this.setState({editable: edit}, function () {
      if (edit) {
        var node = this.refs.description.getDOMNode();
        node.focus();
        node.select();
      }
    });
  },
  moveLeft: function () {
    console.log('Move left');
  },
  moveRight: function () {
    console.log('Move right');
  },
  render: function () {
    var description;

    if (this.state.editable) {
      description = <textarea className="description" ref="description" onBlur={this.toggleEdit.bind(this, false)} defaultValue={this.props.description}></textarea>;
    } else {
      description = <a className="description" href="#" onClick={this.toggleEdit.bind(this, true)}>{this.props.description}</a>;
    }

    return (
      <div className="task">
        {description}
        <div className="actions">
          <button className="move-left" title="Move left" onClick={this.moveLeft}>←</button>
          <button className="move-right" title="Move right" onClick={this.moveRight}>→</button>
        </div>
      </div>
    );
  }
});


/* Render
 * ======================================================================== */

React.renderComponent(
  // What to render
  <div className="page-wrap">
    <Header title="SCRUMtastic" />
    <Main />
  </div>,
  // Where to render
  document.querySelector('body')
);
