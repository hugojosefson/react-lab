/** @jsx React.DOM */

var Row = React.createClass({
    propTypes: {
        description: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number.isRequired,
        date: React.PropTypes.instanceOf(Date)
    },
    render: function () {
        return <tr>
            <td>{this.props.description}</td>
            <td>{this.props.amount}</td>
            <td>{this.props.date}</td>
        </tr>;
    }
});


api.transactions.getAll().then(function (all) {
    React.render(
        <table>
        {all.map(function (row) {
            return <Row {...row} key={row.id}/>;
        })}
        </table>
        ,
        document.querySelector('body')
    );

});
