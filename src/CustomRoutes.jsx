import React from "react";
import { Route } from "react-router-dom";
import MovieTimeline from "./MovieTimeline";
import GreatestByVoteAverage from "./GreatestByVoteAverage";
import PieChart from "./PieChart";

const customRoutes = [
  <Route exact path="/movie-timeline" component={MovieTimeline} />,
  <Route
    exact
    path="/greatest-by-vote-average"
    component={GreatestByVoteAverage}
  />,
  <Route exact path="/pie-chart" component={PieChart} />
];

export default customRoutes;
