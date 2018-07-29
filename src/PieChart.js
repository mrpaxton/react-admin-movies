
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Card } from 'react-admin';
import Typography from '@material-ui/core/Typography';

import {
	RadialChart,
	Hint,
    LabelSeries,
} from 'react-vis';

export default class SimpleRadialChart extends Component {

	state = {
		value: false
	}
                        //onValueMouseOver={v => this.setState({value: v})}
                        //onSeriesMouseOut={v => this.setState({value: false})}
                    //{theta: 2, label: 'Theta Alpha Beta 2', className: 'custom-class'},
	render() {
		const {value} = this.state;
        const data= [
                    {theta: 2, label: 'Theta Alpha Beta 2'},
                    {theta: 6, label: 'Theta6', subLabel: 'Baz'},
                    {theta: 2, label: 'Theta2', subLabel: 'Bar'},
                    {theta: 3, label: 'Theta3', subLabel: 'Foo'},
                    {theta: 1, label: 'Theta1'},
                    ];
		return (
            <Paper>
                    <Typography variant="display3" color="primary">
                        Chart Title
                    </Typography>
                    <RadialChart
                        className={'donut-chart-example'}
                        innerRadius={100}
                        radius={300}
                        getAngle={d => d.theta}
                        animation={true}
                        showLabels={true}
                        data={data}
                        width={1000}
                        labelsAboveChildren={true}
                        labelsRadiusMultiplier={0.8}
                        labelsStyle={{fontSize: 22}}
                        height={800}>


                        {value && <Hint value={value}/>}


                    </RadialChart>
            </Paper>
		);
	}
}
