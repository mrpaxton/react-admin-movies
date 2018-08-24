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
  },
  labelLeft: {
    float: "left",
    width: "40%",
    padding: "10px"
  },
  labelRight: {
    float: "right",
    width: "40%",
    padding: "10px"
  }
};

const VoteFilterSlider = ({ classes, voteCount, onVoteCountChange }) => (
  <div className={classes.root}>
    <div className={classes.labels}>
      <Typography variant="subheading" className={classes.labelLeft}>
        Vote Count
      </Typography>
      <Typography variant="subheading" className={classes.labelRight}>
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

const onVoteChangeHandler = props => (event, value) => {
  const { setVoteCount, refreshMovies } = props;
  setVoteCount(value);
  refreshMovies({ voteFilterNumber: value });
};

const enhance = compose(
  withConnectedRedux,
  withState("voteCount", "setVoteCount", 1000),
  withHandlers({
    onVoteCountChange: onVoteChangeHandler
  }),
  withStyles(styles)
);

export default enhance(VoteFilterSlider);
