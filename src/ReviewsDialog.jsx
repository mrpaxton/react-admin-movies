import React from "react";
import { Loading } from "react-admin";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Timeline, TimelineEvent } from "react-event-timeline";
import themoviedbDataProvider from "./themoviedbDataProvider";

const truncate = require("truncate");

export default class ReviewsDialog extends React.Component {
  state = { isLoading: true, open: false, movieReviews: [] };

  getReviewData = movieId => {
    const dataProvider = themoviedbDataProvider;
    dataProvider("GET_ONE", "reviews", { id: movieId }).then(response => {
      this.setState({ isLoading: false, movieReviews: response.data.results });
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { movieId, movieTitle } = this.props;
    const { isLoading, open, movieReviews } = this.state;
    return (
      <div>
        <Button
          variant="flat"
          color="primary"
          onClick={() => {
            this.getReviewData(movieId);
            this.setState({ open: true });
          }}
        >
          Reviews
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {movieTitle ? `Here're what people say about ${movieTitle}` : ""}
          </DialogTitle>

          {isLoading ? (
            <Loading />
          ) : (
            <DialogContent>
              <Timeline>
                {movieReviews.map(review => (
                  <TimelineEvent
                    title={review && review.author}
                    icon={<i />}
                    iconColor="#2196f3"
                  >
                    {movieReviews.length > 0 &&
                      review &&
                      truncate(review.content, 400)}
                  </TimelineEvent>
                ))}
              </Timeline>
            </DialogContent>
          )}

          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
