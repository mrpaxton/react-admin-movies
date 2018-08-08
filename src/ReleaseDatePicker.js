
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import RefreshMoviesAction from './RefreshMoviesAction';


class DateFilterDialog extends React.Component {

	state = {
		open: false,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onDayClick = day => {
		const selectedDateString = day.toISOString().split("T")[0];
		const { refreshMovies } = this.props;
		refreshMovies({
			release_date_after: selectedDateString
		});
	}

	render() {
		return (
			<div>
				<Button onClick={this.handleClickOpen}>Date Filter</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Filter movies by release date"}</DialogTitle>
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


const DatePickerComponent = ({refreshMovies, ...props}) =>
	<DateFilterDialog refreshMovies={refreshMovies} />;


export default connect(
	null, {
		refreshMovies: RefreshMoviesAction,
	}
)(DatePickerComponent);
