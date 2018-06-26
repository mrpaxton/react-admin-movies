
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


class Dashboard extends React.Component {

    state = {};

    componentDidMount() {
        fetch("https://blockchain.info/us/ticker")
            .then( res => res.json() )
            .then( data => { this.setState( {price: data.USD["15m"]} ) } )
    }

    render() {
        const { price } = this.state;
        return (
            <Card>
                <CardHeader title="Hello Admin!" />
                <CardContent>This is an example of a dashboard using react-admin</CardContent>
                <Typography>{ price || "Data Retrieval Error" }</Typography>
            </Card>
        );
    }
}

export default Dashboard;
