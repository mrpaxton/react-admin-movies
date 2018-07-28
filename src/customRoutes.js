
import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import TestChart from './TestChart';

export default [
    <Route exact path="/dashboard" component={Dashboard} />,
    <Route exact path="/test-chart" component={TestChart} />,
];
