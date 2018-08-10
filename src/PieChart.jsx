import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { GET_LIST } from "react-admin";
import Typography from "@material-ui/core/Typography";
import { RadialChart } from "react-vis";
import themoviedbDataProvider from "./themoviedbDataProvider";

const truncate = require("truncate");

export default class SimpleRadialChart extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    const dataProvider = themoviedbDataProvider;
    dataProvider(GET_LIST, "movies", {})
      .then(result => {
        this.setState({
          data: result.data.slice(0, 5).reduce((acc, m) => {
            acc.push({
              label: m.title.length > 25 ? truncate(m.title, 25) : m.title,
              theta: m.vote_count.toString(),
              subLabel: m.vote_count.toString()
            });
            return acc;
          }, [])
        });
      })
      .catch(() => {
        this.setState({ data: {} });
      });
  }

  render() {
    const { data: chartData } = this.state;

    return !chartData ? (
      <h3>No Movies Data</h3>
    ) : (
      <Paper style={{ padding: 10 }}>
        <Typography variant="display1" color="primary" align="center">
          Vote Count Distribution amoung Top Movies
        </Typography>
        <RadialChart
          className="donut-chart-example"
          innerRadius={100}
          radius={300}
          getAngle={d => d.theta}
          animation
          showLabels
          data={chartData}
          width={800}
          labelsAboveChildren
          labelsRadiusMultiplier={0.9}
          labelsStyle={{ fontSize: 15 }}
          height={700}
        />
      </Paper>
    );
  }
}
