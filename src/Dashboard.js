
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

//import { VictoryBar } from 'victory';
import { PopularityChart, VoteAverageChart } from './VictoryCharts';

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
                <CardHeader title="Coz movies are fun :)" />
                <CardContent>A movie dashboard using react-admin</CardContent>
                <Typography>{ price || "Data Retrieval Error" }</Typography>
                <VoteAverageChart />
                <PopularityChart />
            </Card>
        );
    }
}

export default Dashboard;
