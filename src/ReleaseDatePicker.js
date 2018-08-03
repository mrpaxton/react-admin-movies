
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import RefreshMoviesAction from './RefreshMoviesAction';


class DatePickerComponent extends Component {

    state = { date: new Date() };

    onChange = date => {

        if (date && date instanceof Date) {
            this.setState({ date });
        } else {
            date = this.state.date;
        }
        const { refreshMovies } = this.props;
        //parse the date in this format: YYYY-MM-DD
        refreshMovies({
            release_date_after: date.toISOString().split("T")[0]
        });
    }

    render() {
        return (
            <div style={{marginBottom: "90px"}} >
                <Typography variant="subheading"
                    color="primary">Release Date Filter</Typography>
                <DatePicker onChange={this.onChange} value={this.state.date} />
            </div>
        );
    }
}

export default connect(
    null, {
        refreshMovies: RefreshMoviesAction,
    }
)(DatePickerComponent);
