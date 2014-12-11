/** @jsx React.DOM */

var TransactionRow = React.createClass({
    propTypes: {
        description: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number.isRequired,
        date: React.PropTypes.instanceOf(Date)
    },
    render: function () {
        return <tr>
            <td>{this.props.description}</td>
            <td className="amount {this.props.amount < 0 ? 'negative' : 'positive'}">{this.props.amount}</td>
            <td className="date">{moment(this.props.date).format('YYYY-MM-DD')}</td>
        </tr>;
    }
});

var SummaryRow = React.createClass({
    propTypes: {
        amount: React.PropTypes.number.isRequired
    },
    render: function () {
        return <tr className="summary">
            <td>Sum</td>
            <td className="amount {this.props.amount < 0 ? 'negative' : 'positive'}">{this.props.amount}</td>
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
                    <tbody>
                        {all.map(function (transaction) {
                            return <TransactionRow {...transaction} key={transaction.id}/>;
                        })}
                    </tbody>
                    <tfoot>
                        <SummaryRow amount={all.map(pluck('amount')).reduce(add, 0)}/>
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

