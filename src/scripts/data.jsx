// Mock implementation of a server API.
var api = (function () {
  var nextId = 0;
  var transactions = [];

  function getAll() {
    return Promise.resolve(transactions);
  }

  function add(transaction) {
    transaction.id = nextId++;
    transactions.push(transaction);
    return Promise.resolve(transaction);
  }

  add({
    description: 'Burgers',
    amount: 54.99,
    date: new Date(2014, 04, 05)
  });
  add({
    description: 'General Awesomeness Award',
    amount: 10000,
    date: new Date(2013, 01, 21)
  });

  return {
    transactions: {
      getAll: getAll,
      add: add
    }
  };
})();
