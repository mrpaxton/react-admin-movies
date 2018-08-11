// Utilizing the Dx React Chart library(dx-react-chart-material-ui)
import * as React from "react";
import PropTypes from "prop-types";
import { GET_LIST, Loading } from "react-admin";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  Grid,
  BarSeries,
  Title
} from "@devexpress/dx-react-chart-material-ui";
import themoviedbDataProvider from "./themoviedbDataProvider";

const dataProvider = themoviedbDataProvider;
const imageSize = 120;
const labelOffset = 10;

const getPath = (x, y, width, height) =>
  `
        M ${x} ${height + y}
        L ${width + x} ${height + y}
        L ${width + x} ${y + 30}
        L ${width / 2 + x} ${y}
        L ${x} ${y + 30}
        Z
    `;

const BarWithLabel = props => {
  const { x, y, width, height, themeColor, value } = props;

  return (
    <React.Fragment>
      <path d={getPath(x, y, width, height)} fill={themeColor} />
      <ArgumentAxis.Label
        x={x + width / 2}
        y={y + height / 2}
        dominantBaseline="central"
        textAnchor="middle"
        text={value}
        style={{ fill: "#BBDEFB" }}
      />
    </React.Fragment>
  );
};

BarWithLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired
};

class GreatestByVoteAverage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: false
    };
    this.getLabelWithAvatarComponent = this.getLabelWithAvatarComponent.bind(
      this
    );
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  getData() {
    const { data: dataState } = this.state;
    if (!dataState) {
      dataProvider(GET_LIST, "movies", {})
        .then(result => {
          this.setState({
            data: result.data.slice(0, 7)
          });
        })
        .catch(() => this.setState({ data: false }));
    }
  }

  getLabelWithAvatarComponent(props) {
    const { text, x, y } = props;
    const { data } = this.state;
    const movie = data.find(({ title }) => title === text);
    return (
      <React.Fragment>
        <image
          href={movie.image_path}
          width={imageSize}
          height={imageSize}
          transform={`translate(${x - imageSize / 2} ${y - labelOffset})`}
        />
        <ArgumentAxis.Label {...props} y={y + imageSize} />
      </React.Fragment>
    );
  }

  render() {
    const { data: chartData } = this.state;

    if (!chartData) {
      return <Loading />;
    }

    return (
      <Paper>
        {chartData ? (
          <Chart data={chartData}>
            <ArgumentAxis
              name="title"
              type="band"
              labelComponent={this.getLabelWithAvatarComponent}
              tickComponent={() => null}
            />
            <ValueAxis name="vote_average" lineComponent={() => null} />
            <Grid name="vote_average" strokeDasharray="10 10" />
            <BarSeries
              name="VoteAverage"
              valueField="vote_average"
              argumentField="title"
              axisName="vote_average"
              pointComponent={BarWithLabel}
            />
            <Title
              text="Top Movies by Vote Average"
              style={{ textAlign: "center", width: "100%", marginBottom: 4 }}
            />
          </Chart>
        ) : (
          <h1>Data is not ready. Please try again.</h1>
        )}
      </Paper>
    );
  }
}

export default GreatestByVoteAverage;
