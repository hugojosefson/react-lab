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
        <TransactionLog />
      </main>
    );
  }
});

var TransactionLog = React.createClass({
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
    api.expenses.getAll().then(function (transactions) {
      self.setState({
        transactions: transactions
      });
    });
  },
  render: function () {
    var self = this;

    if (!self.state.transactions) {
      return <p>Loading...</p>;
    }
    if (self.state.transactions.length === 0) {
      return <p>You have no transactions.</p>;
    }

    function createTransactionRow(transaction, i) {
      return (
        //<tr key={i}><td>Hej</td></tr>
        <TransactionRow key={i} transaction={ transaction }></TransactionRow>
      );
    }

    var rows = self.state.transactions.map(createTransactionRow);

    return (
      <table className="transaction-log">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        //<tbody>{rows}</tbody>
        <tbody>
          <tr><td>hej</td></tr>
        </tbody>
        <tfoot>
          <SummaryRow transactions={ self.state.transactions } />
        </tfoot>
      </table>
    );
  }
});

var TransactionRow = React.createClass({
  render: function () {
    //var transaction = this.props.transaction;
    //var date = transaction.date.toString();
    //console.log(date);
    return (
      <tr>
     //   <td>{ transaction.description }</td>
   //     <ColoredAmountCell amount={ transaction.amount } />
       // <td>{ date }</td>
      </tr>
    );
  }
});

var SummaryRow = React.createClass({
  render: function () {
    function sum (t1, t2) {
      return t1.amount + t2.amount;
    }
    var total = this.props.transactions.reduce(sum);
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
    var c = amount >= 0 ? 'positive' : 'negative';

    return <td className={ 'amount ' + c}>{amount}</td>;
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
