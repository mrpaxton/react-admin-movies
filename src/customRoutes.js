
import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import GreatestByVoteAverage from './GreatestByVoteAverage';
import PieChart from './PieChart';

export default [
    <Route exact path="/dashboard" component={Dashboard} />,
    <Route exact path="/greatest-by-vote-average" component={GreatestByVoteAverage} />,
    <Route exact path="/pie-chart" component={PieChart} />,
];
