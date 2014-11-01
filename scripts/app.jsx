/** @jsx React.DOM */


/* Components
 * ======================================================================== */

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
  load: function () {
    var self = this;
    api.scrumBoards.getActiveScrumBoard().then(function (scrumBoard) {
      self.setState({
        scrumBoard: scrumBoard
      });
    });
  },
  getInitialState: function () {
    return {
      scrumBoard: null
    };
  },
  componentDidMount: function () {
    this.load();
  },
  onTaskMove: function (task, direction) {
    var scrumBoard = this.state.scrumBoard;
    var columns = scrumBoard.columns;

    function indexOfColumnWithId(id) {
      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        if (column.id === id) {
          return columns.indexOf(column);
        }
      }
      return null;
    }

    var columnIndex = indexOfColumnWithId(task.columnId);

    if (columnIndex === null) {
      return;
    }

    var nextColumnIndex = columnIndex;

    if (direction === 'left' && columnIndex > 0) {
      nextColumnIndex = columns[columnIndex - 1].id;
    } else if (direction === 'right' && columnIndex < (columns.length - 1)){
      nextColumnIndex = columns[columnIndex + 1].id;
    }

    if (columnIndex !== nextColumnIndex) {
      var current = columns[columnIndex];
      current.tasks = current.tasks.filter(function (t) {
        return t.id !== task.id;
      });
      var next = columns[nextColumnIndex];
      task.columnId = next.id;
      next.tasks.push(task);

      this.setState({
        scrumBoard: scrumBoard
      });
    }
  },
  render: function () {
    var self = this;

    if (!this.state.scrumBoard) {
      return <p>Loading...</p>;
    }

    function createColumn(column, i) {
      return (
        <Column key={i} column={column} onTaskMove={self.onTaskMove} />
      );
    }

    var columns = this.state.scrumBoard.columns.map(createColumn);

    return (
      <div className="scrum-board">
        {columns}
      </div>
    );
  }
});


/* Column */

var Column = React.createClass({
  onTaskMove: function () {
    this.props.onTaskMove.apply(null, arguments);
  },
  render: function () {
    var self = this;

    function taskIsInColumn(task) {
      return task.columnId === self.props.column.id;
    }

    function createTask(task, i) {
      return (
        <Task key={i} task={task} onTaskMove={self.onTaskMove} />
      );
    }

    var tasks = self.props.column.tasks.filter(taskIsInColumn).map(createTask);

    return (
      <div className="column">
        <h3>{this.props.column.title}</h3>
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
      task: this.props.task
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
    this.props.onTaskMove(this.state.task, 'left');
  },
  moveRight: function () {
    // TODO: Move task right.
    this.props.onTaskMove(this.state.task, 'right');
  },
  render: function () {
    var description;

    if (this.state.editable) {
      description = <textarea className="description" ref="description" onBlur={this.save} defaultValue={this.state.task.description}></textarea>;
    } else {
      description = <a className="description" ref="description" href="#" onClick={this.editMode}>{this.state.task.description}</a>;
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
