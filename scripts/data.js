var api = {
  scrumBoards: {
    getActiveScrumBoard: function () {
      var columns = [{
        "id": 0,
        "title": "Backlog",
        tasks: [{
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
        }]
      },
      {
        "id": 1,
        "title": "In Progress",
        tasks: [{
          "id": 3,
          "columnId": 1,
          "description": "Organize and perform testing session."
        }]
      },
      {
        "id": 2,
        "title": "Done",
        tasks: [{
          "id": 4,
          "columnId": 2,
          "description": "Change double quotes to single quotes."
        }]
      }];

      return Promise.resolve({
        columns: columns
      });
    }
  }
};
