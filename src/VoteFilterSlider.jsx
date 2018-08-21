import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core/styles";
import { selectVoteFilterAction, refreshMoviesAction } from "./actions";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    width: 300
  },
  labels: {
    height: 50,
  }
};

class VoteFilterSlider extends React.Component {
  state = {
    value: 1000
  };

  handleChange = (event, value) => {
    const { refreshMovies } = this.props;
    this.setState({ value });
    refreshMovies({ voteFilterNumber: value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.labels}>
          <Typography
            variant="subheading"
            style={{ float: "left", width: "40%", padding: "10px" }}
          >
            Vote Count
          </Typography>
          <Typography
            variant="subheading"
            style={{
              float: "right",
              width: "40%",
              padding: "10px"
            }}
          >
            {value}
          </Typography>
        </div>
        <Slider
          color="secondary"
          value={value}
          min={0}
          max={10000}
          step={1000}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

VoteFilterSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapActionsToProps = {
  refreshMovies: refreshMoviesAction,
  selectVoteFilter: selectVoteFilterAction
};

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(VoteFilterSlider));
