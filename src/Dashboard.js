
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { PopularityChart, VoteAverageChart } from './VictoryCharts';

class Dashboard extends React.Component {

    state = {};

    componentDidMount() {
        //get movie popularity data and pass it through Chart
    }

    render() {
        const { price } = this.state;
        return (
            <Card>
                <CardHeader title="Top Popular Movies" />
                <CardContent>Bar Chart by Formidable's Victory Chart</CardContent>
                <Typography>{ price || "Data Retrieval Error" }</Typography>
                <VoteAverageChart />
                <PopularityChart />
            </Card>
        );
    }
}

export default Dashboard;
