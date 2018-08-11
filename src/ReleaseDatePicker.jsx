import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import refreshMoviesAction from "./refreshMoviesAction";

class DateFilterDialog extends React.Component {
  state = {
    open: false
  };

  onDayClick = day => {
    const selectedDateString = day.toISOString().split("T")[0];
    const { refreshMovies } = this.props;
    refreshMovies({
      releaseDateAfter: selectedDateString
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Date Filter</Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Filter movies by release date"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <DayPicker onDayClick={this.onDayClick} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DateFilterDialog.propTypes = {
  refreshMovies: PropTypes.func.isRequired
};

const DatePickerComponent = ({ refreshMovies }) => (
  <DateFilterDialog refreshMovies={refreshMovies} />
);

DatePickerComponent.propTypes = {
  refreshMovies: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    refreshMovies: refreshMoviesAction
  }
)(DatePickerComponent);
