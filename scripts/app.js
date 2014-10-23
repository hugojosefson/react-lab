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
    var self = this;
    columnData.getAll().then(function (data) {
      self.setState({columns: data});
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
    function createColumn(column) {
      return (
        <Column key={column.id} id={column.id} title={column.title} url="/data/tasks.json" />
      );
    }

    var columns = this.state.columns.map(createColumn);

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
    var self = this;
    taskData.getAll().then(function (data) {
      self.setState({tasks: data});
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

    function taskIsInColumn(task) {
      return task.columnId === self.props.id;
    }

    function createTask(task) {
      return (
        <Task key={task.id} id={task.id} description={task.description} />
      );
    }

    var tasks = this.state.tasks.filter(taskIsInColumn).map(createTask);

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
      editable: false,
      description: this.props.description
    };
  },
  editMode: function () {
    this.setState({editable: true}, function () {
      var node = this.refs.description.getDOMNode();
      node.focus();
      node.select();
    });
  },
  save: function () {
    this.setState({editable: false});
  },
  moveLeft: function () {
    // TODO: Move task left.
  },
  moveRight: function () {
    // TODO: Move task right.
  },
  render: function () {
    var description;

    if (this.state.editable) {
      description = <textarea className="description" ref="description" onBlur={this.save} defaultValue={this.state.description}></textarea>;
    } else {
      description = <a className="description" ref="description" href="#" onClick={this.editMode}>{this.state.description}</a>;
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
