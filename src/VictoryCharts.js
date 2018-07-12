
import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryAxis, VictoryChart, VictoryBar, VictoryLabel, VictoryTheme } from 'victory';

const data = [
    {title: "Jurassic World: Fallen Kingdom", popularity: 279.588, vote_average: 6.6, vote_count: 1642},
    {title: "Ant-Man and the Wasp", popularity: 181.387, vote_average: 7.2, vote_count: 262},
    {title: "Incredibles 2", popularity: 169.606, vote_average: 7.7, vote_count: 881},
    {title: "Ready Player One", popularity: 149.864, vote_average: 7.7, vote_count: 2736},
    {title: "Avengers: Infinity War", popularity: 135.744, vote_average: 8.4, vote_count: 5486},
];

export const VoteAverageChart = () => (
    <svg viewBox={"0,0,400,400"}  preserveAspectRatio="none" width="50%">
    <VictoryChart
		standalone={false}
        theme={VictoryTheme.material} >
	<VictoryLabel text="Vote Average of Top 5 Movies by Vote Average" x={200} y={30} textAnchor="middle"/>
        <VictoryAxis
            tickValues={[0,1,2,3,4,5,6,7,8,9]}
        />
		<VictoryBar
			horizontal
            alignment="middle"
            barRatio={0.7}
			data={data}
			y="vote_average"
			labels={(d) => (`${d.title.length > 20 ? d.title.slice(0,21) + "..." : d.title}`) }
			labelComponent={<VictoryLabel  dx={-100} textAnchor="end" />}
			style={{ parent: {border: "1px solid #ccc"}, data: {fill: "gold", opacity: 0.85}, labels: { fill: "#teal" } }}
        />
    </VictoryChart>
    </svg>
);

export const PopularityChart = () => (
    <svg viewBox={"0,0,400,400"}  preserveAspectRatio="none" width="50%">
	<VictoryChart
		standalone={false}
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
      >
	<VictoryLabel text="Popularity of Top 5 Movies by Popularity" x={200} y={30} textAnchor="middle"/>
        <VictoryAxis
          style={{ tickLabels: { angle: -60 } }}
          tickValues={[100, 200, 300, 400, 500]}
          tickFormat={[data[0].title, data[1].title, data[2].title, data[3].title, data[4].title]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x.toFixed(0)}`)}
        />
        <VictoryBar
          data={data}
          x="title"
          y="popularity"
        />
      </VictoryChart>
    </svg>
);
