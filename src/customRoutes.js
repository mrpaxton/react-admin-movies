
import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import TestChart from './TestChart';
import PieChart from './PieChart';

export default [
    <Route exact path="/dashboard" component={Dashboard} />,
    <Route exact path="/test-chart" component={TestChart} />,
    <Route exact path="/pie-chart" component={PieChart} />,
];
