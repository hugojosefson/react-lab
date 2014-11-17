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
  getInitialState: function () {
    return {
      transactions: null
    };
  },
  componentDidMount: function () {
    this.load();
  },
  load: function () {
    var self = this;
    api.transactions.getAll().then(function (transactions) {
      self.setState({
        transactions: transactions
      });
    });
  },
  onTransactionAdded: function () {
    this.load();
  },
  render: function () {
    if (!this.state.transactions) {
      return <p>Loading...</p>;
    }

    return (
      <main className="main" role="main">
        <TransactionLog
          transactions={this.state.transactions}>
        </TransactionLog>
        <AddTransactionForm
          onTransactionAdded={this.onTransactionAdded}>
        </AddTransactionForm>
      </main>
    );
  }
});

var TransactionLog = React.createClass({
  render: function () {
    var self = this;
    var transactions = self.props.transactions || [];

    if (transactions.length === 0) {
      return <p>You have no transactions.</p>;
    }

    function createTransactionRow(transaction, i) {
      return (
        <TransactionRow key={i} transaction={ transaction }></TransactionRow>
      );
    }

    var rows = transactions.map(createTransactionRow);

    return (
      <table className="transaction-log">
        <thead>
          <tr>
            <th>Description</th>
            <th className="amount">Amount</th>
            <th className="date">Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <tfoot>
          <SummaryRow transactions={ transactions } />
        </tfoot>
      </table>
    );
  }
});

var TransactionRow = React.createClass({
  render: function () {
    var transaction = this.props.transaction;
    var date = transaction.date.toLocaleDateString();

    return (
      <tr>
        <td>{ transaction.description }</td>
        <ColoredAmountCell amount={ transaction.amount } />
        <td className="date">{ date }</td>
      </tr>
    );
  }
});

var SummaryRow = React.createClass({
  render: function () {
    function sum (acc, t) {
      return acc + t.amount;
    }
    var total = this.props.transactions.reduce(sum, 0);
    return (
      <tr>
        <td>Total</td>
        <ColoredAmountCell amount={ total } />
        <td></td>
      </tr>
    );
  }
});

var ColoredAmountCell = React.createClass({
  render: function () {
    var amount = this.props.amount;
    var classes = React.addons.classSet({
      amount: true,
      positive: amount >= 0,
      negative: amount < 0
    });

    return <td className={classes}>{amount}</td>;
  }
});

var AddTransactionForm = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();
    var self = this;

    var description = this.refs.description.getDOMNode().value.trim();
    var amount = parseFloat(this.refs.amount.getDOMNode().value);

    if (!description || amount === 0) {
      return;
    }

    api.transactions.add({
      description: description,
      amount: amount,
      date: new Date()
    }).then(function (transaction) {
      self.props.onTransactionAdded(transaction);
      self.clear();
    });
  },
  clear: function () {
    this.refs.description.getDOMNode().value = '';
    this.refs.amount.getDOMNode().value = '';
  },
  render: function () {
    return (
      <form className="add-transaction" onSubmit={this.onSubmit}>
        <input ref="description" type="text" placeholder="Description" />
        <input ref="amount" type="number" placeholder="Amount" />
        <button type="submit">Add</button>
      </form>
    );
  }
});

/* Render
 * ======================================================================== */

React.render(
  // What to render
  <div className="page-wrap">
    <Header title="Expense Manager" />
    <Main />
  </div>,
  // Where to render
  document.querySelector('body')
);
