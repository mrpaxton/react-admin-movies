
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import VerticalTimelineDisplay from './VerticalTimelineDisplay';
import UserList from "./UserList";

class MovieTimeline extends React.Component {

    render() {
        return (
            <Card>
                <CardHeader title="Top 20 Movies Timeline, since 2000" />
                <CardContent>
                    <VerticalTimelineDisplay />
                </CardContent>
                <UserList />
            </Card>
        );
    }
}

export default MovieTimeline;
