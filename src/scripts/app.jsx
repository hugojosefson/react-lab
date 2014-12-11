/** @jsx React.DOM */

var AmountCell = React.createClass({
    propTypes: {
        amount: React.PropTypes.number.isRequired
    },
    render: function () {
        var signClass = this.props.amount < 0 ? 'negative' : 'positive';
        return <td className="amount {signClass}">{this.props.amount}</td>;
    }
});

var TransactionRow = React.createClass({
    propTypes: {
        description: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number.isRequired,
        date: React.PropTypes.instanceOf(Date)
    },
    render: function () {
        return <tr>
            <td>{this.props.description}</td>
            <AmountCell amount={this.props.amount}/>
            <td className="date">{moment(this.props.date).format('YYYY-MM-DD')}</td>
        </tr>;
    }
});

var TransactionsBody = React.createClass({
    propTypes: {
        transactions: React.PropTypes.array.isRequired
    },
    render: function () {
        return <tbody>
            {this.props.transactions.map(function (transaction) {
                return <TransactionRow {...transaction} key={transaction.id}/>;
            })}
        </tbody>;
    }
});

var SummaryRow = React.createClass({
    propTypes: {
        transactions: React.PropTypes.array.isRequired
    },
    render: function () {
        var amount = this.props.transactions.map(pluck('amount')).reduce(add, 0);
        return <tr className="summary">
            <td>Sum</td>
            <AmountCell amount={amount}/>
            <td></td>
        </tr>;
    }
});

api.transactions.getAll().then(function (all) {
    React.render(
        <div className="page-wrap">
            <header className="header" role="banner">
                <h1>
                    <a href="blueprint.html">Expense Manager</a>
                </h1>
            </header>
            <main className="main" role="main">
                <table className="transaction-log">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th className="amount">Amount</th>
                            <th className="date">Date</th>
                        </tr>
                    </thead>
                    <TransactionsBody transactions={all}/>
                    <tfoot>
                        <SummaryRow transactions={all}/>
                    </tfoot>
                </table>
            </main>
        </div>
        ,
        document.querySelector('body')
    );

});

function pluck(prop) {
    return function (o) {
        return o[prop];
    };
}

function add(a, b) {
    return a + b;
}

