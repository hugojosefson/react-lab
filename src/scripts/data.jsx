var api = {
  expenses: {
    getAll: function () {

      return Promise.resolve([{
        id: 0,
        description: 'Burgers',
        amount: 54.99,
        date: new Date()
      },
      {
        id: 1,
        description: 'General Awesomeness Award',
        amount: 10000,
        date: (function () {
          var d = new Date();
          d.setMonth(2);
        })()
      }]);
    }
  }
};
