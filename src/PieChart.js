
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Card, GET_LIST } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import themoviedbDataProvider from './themoviedbDataProvider';
import {
	RadialChart,
	Hint,
    LabelSeries,
} from 'react-vis';

const truncate = require('truncate');


export default class SimpleRadialChart extends Component {

	state = {
        data: null,
		value: false,
	}

    componentDidMount() {
        const dataProvider = themoviedbDataProvider;
        dataProvider(GET_LIST, 'movies', {})
            .then(result => {
                this.setState({ data: result.data.slice(0,5)
                    .reduce((acc, m) => {
                        acc.push(
                            {
                                label: m.title.length > 25 ? truncate(m.title, 25) : m.title,
                                theta: m.vote_count.toString(),
                                subLabel: m.vote_count.toString(),
                            }
                        );
                        return acc;
                    }, []),
                    value: true
                });
            })
            .catch( () => {
                this.setState({ data: {} });
            });
    }

	render() {

        const { data: chartData } = this.state;

		return !chartData ? <h3>No Movies Data</h3> : (
            <Paper elevation2 style={{padding:30}}>
                    <Typography variant="display1" color="primary" alignCenter>
                        Vote Count Distribution amoung Top Movies
                    </Typography>
                    <RadialChart
                        className={'donut-chart-example'}
                        innerRadius={100}
                        radius={300}
                        getAngle={d => d.theta}
                        animation={true}
                        showLabels={true}
                        data={chartData}
                        width={1000}
                        labelsAboveChildren={true}
                        labelsRadiusMultiplier={0.9}
                        labelsStyle={{fontSize: 15}}
                        height={700}>
                    </RadialChart>
            </Paper>
		);
	}
}
