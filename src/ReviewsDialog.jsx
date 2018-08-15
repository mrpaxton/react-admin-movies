import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Timeline, TimelineEvent } from "react-event-timeline";

export default class ReviewsDialog extends React.Component {
  state = { open: false };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="raised"
          color="secondary"
          onClick={() => {
            this.setState({ open: true });
          }}
        >
          Reviews
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>

            <Timeline>
              <TimelineEvent
                title="John Doe sent a SMS"
                createdAt="2016-09-12 10:06 PM"
                icon={<i />}
                iconColor="#6fba1c"
              >
                I received the payment for $543. Should be shipping the item
                within a couple of hours. Thanks for the order!
              </TimelineEvent>
              <TimelineEvent
                title="You sent an email to John Doe"
                createdAt="2016-09-11 09:06 AM"
                icon={<i />}
                iconColor="#03a9f4"
              >
                <p>Subject: Any updates?</p>
                <p>
                  Like we talked, you said that you would share the shipment
                  details? This is an urgent order and so I am losing patience.
                </p>
                <p>- Maya</p>
              </TimelineEvent>
              <TimelineEvent
                createdAt="2016-09-12 10:06 PM"
                icon={<i />}
                iconColor="#6fba1c"
              >
                I received the payment for $543. Should be shipping the item
                within a couple of hours. Thanks for the order!
              </TimelineEvent>
              <TimelineEvent
                title="You sent an email to John Doe"
                createdAt="2016-09-11 09:06 AM"
                icon={<i />}
                iconColor="#03a9f4"
              >
                <p>Subject: Any updates?</p>
                <p>
                  Like we talked, you said that you would share the shipment
                  details? This is an urgent order and so I am losing patience.
                  already!
                </p>
                <p>- Maya</p>
              </TimelineEvent>
              <TimelineEvent
                title="John Doe sent a SMS"
                createdAt="2016-09-12 10:06 PM"
                icon={<i />}
                iconColor="#6fba1c"
              >
                I received the payment for $543. Should be shipping the item
                within a couple of hours. Thanks for the order!
              </TimelineEvent>
              <TimelineEvent
                title="You sent an email to John Doe"
                createdAt="2016-09-11 09:06 AM"
                icon={<i />}
                iconColor="#03a9f4"
              >
                <p>Subject: Any updates?</p>
                <p>
                  Like we talked, you said that you would share the shipment
                  details? This is an urgent order and so I am losing patience.
                </p>
                <p>- Maya</p>
              </TimelineEvent>
            </Timeline>

          </DialogContent>
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
