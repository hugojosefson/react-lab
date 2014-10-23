var taskData = {
  data: [
    {
      "id": 0,
      "columnId": 0,
      "description": "Fix bug that appeared 1 year ago."
    },
    {
      "id": 1,
      "columnId": 0,
      "description": "Add something useful to project."
    },
    {
      "id": 2,
      "columnId": 0,
      "description": "Change feature X to do Y instead."
    },
    {
      "id": 3,
      "columnId": 1,
      "description": "Organize and perform testing session."
    },
    {
      "id": 4,
      "columnId": 2,
      "description": "Change double quotes to single quotes."
    }
  ],
  getAll: function () {
    return Promise.resolve(this.data);
  },
  get: function (id) {
    var task = this.data.filter(function (task) {
      return task.id === id;
    })[0];
    return Promise.resolve(task);
  }
};

var columnData = {
  data: [
    {
      "id": 0,
      "title": "Backlog"
    },
    {
      "id": 1,
      "title": "In Progress"
    },
    {
      "id": 2,
      "title": "Done"
    }
  ],
  getAll: function () {
    return Promise.resolve(this.data);
  },
  get: function (id) {
    var column = this.data.filter(function (column) {
      return column.id === id;
    })[0];

    return Promise.resolve(column);
  }
};
