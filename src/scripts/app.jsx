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
        var transactions = this.props.transactions.sort(function (t1, t2) {
            return t1.date.getTime() - t2.date.getTime();
        });
        return <tbody>
            {transactions.map(function (transaction) {
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

var AddTransactionForm = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired
    },
    onSubmit: function (e) {
        e.preventDefault();

        var transaction = {
            description: this.getDOMNode().querySelector('input[data-name=description]').value,
            amount: parseFloat(this.getDOMNode().querySelector('input[data-name=amount]').value),
            date: new Date()
        };
        this.props.onSubmit(transaction);
        this.getDOMNode().reset();
    },
    render: function () {
        return <form className="add-transaction">
            <input type="text" data-name="description" placeholder="Description"/>
            <input type="number" data-name="amount" placeholder="Amount"/>
            <button type="submit" onClick={this.onSubmit}>Submit</button>
        </form>;
    }
});

var ExpenseManager = React.createClass({
    propTypes: {
        api: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            transactions: []
        };
    },
    componentDidMount: function () {
        this.props.api.transactions.getAll().then(function (transactions) {
            this.setState({transactions: transactions});
        }.bind(this));
    },
    addTransaction: function (transaction) {
        this.props.api.transactions.add(transaction).then(this.componentDidMount.bind(this));
    },
    render: function () {
        return <div className="page-wrap">
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
                    <TransactionsBody transactions={this.state.transactions}/>
                    <tfoot>
                        <SummaryRow transactions={this.state.transactions}/>
                    </tfoot>
                </table>
                <AddTransactionForm onSubmit={this.addTransaction}/>
            </main>
        </div>;
    }
});

React.render(
    <ExpenseManager api={api}/>
    ,
    document.querySelector('body')
);


function pluck(prop) {
    return function (o) {
        return o[prop];
    };
}

function add(a, b) {
    return a + b;
}

