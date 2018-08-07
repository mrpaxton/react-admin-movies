
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { PopularityChart } from './VictoryCharts';

import VerticalTimelineDisplay from './VerticalTimelineDisplay';

class Dashboard extends React.Component {

    state = {};

    componentDidMount() {
        //get movie popularity data and pass it through Chart
    }

    render() {
        return (
            <Card>
                <CardHeader title="Top Popular Movies" />
                <CardContent></CardContent>
                <PopularityChart />
                <VerticalTimelineDisplay />
            </Card>
        );
    }
}

export default Dashboard;
