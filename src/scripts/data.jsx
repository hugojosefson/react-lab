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
    date: new Date()
  });
  add({
    description: 'General Awesomeness Award',
    amount: 10000,
    date: new Date()
  });

  return {
    transactions: {
      getAll: getAll,
      add: add
    }
  };
})();
