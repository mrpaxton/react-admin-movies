import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core/styles";
import { compose, withState, withHandlers } from "recompose";
import Typography from "@material-ui/core/Typography";
import { selectVoteFilterAction, refreshMoviesAction } from "./actions";

const styles = {
  root: {
    width: 300
  },
  labels: {
    height: 50
  }
};

const VoteFilterSlider = ({ classes, voteCount, onVoteCountChange }) => (
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
        {voteCount}
      </Typography>
    </div>
    <Slider
      color="secondary"
      value={voteCount}
      min={0}
      max={10000}
      step={1000}
      onChange={onVoteCountChange}
    />
  </div>
);

VoteFilterSlider.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    labels: PropTypes.string
  }).isRequired,
  voteCount: PropTypes.number.isRequired,
  onVoteCountChange: PropTypes.func.isRequired
};

const mapActionsToProps = {
  refreshMovies: refreshMoviesAction,
  selectVoteFilter: selectVoteFilterAction
};

const withConnectedRedux = connect(
  null,
  mapActionsToProps
);

const enhance = compose(
  withConnectedRedux,
  withStyles(styles),
  withState("voteCount", "setVoteCount", 1000),
  withHandlers({
    onVoteCountChange: props => (event, value) => {
      const { setVoteCount, refreshMovies } = props;
      setVoteCount(value);
      refreshMovies({ voteFilterNumber: value });
    }
  })
);

export default enhance(VoteFilterSlider);
