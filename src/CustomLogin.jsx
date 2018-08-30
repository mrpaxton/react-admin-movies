import React, { Component } from "react";
import PropTypes from "prop-types";
import { propTypes, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import LockIcon from "@material-ui/icons/Lock";
import {
  Notification,
  translate as translateDecorator,
  userLogin as userLoginAction
} from "react-admin";

const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "url(https://source.unsplash.com/1600x900/?nature,vacation)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  card: {
    minWidth: 350,
    marginTop: "8em"
  },
  avatar: {
    margin: "1em",
    display: "flex",
    justifyContent: "center"
  },
  icon: {
    backgroundColor: theme.palette.primary.main
  },
  hint: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "center",
    color: theme.palette.grey[700]
  },
  form: {
    padding: "0 1em 1em 1em"
  },
  input: {
    marginTop: "1em"
  },
  actions: {
    padding: "0 1em 1em 1em"
  }
});

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
  meta: { touched, error } = {},
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

class CustomLogin extends Component {
  login = auth => {
    const { userLogin, location } = this.props;
    userLogin(auth, location.state ? location.state.nextPathname : "/");
  };

  render() {
    const { classes, handleSubmit, isLoading, translate } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar className={classes.icon}>
              <LockIcon />
            </Avatar>
          </div>
          <form onSubmit={handleSubmit(this.login)}>
            <div className={classes.hint}>Try: movies / movies</div>
            <div className={classes.form}>
              <div className={classes.input}>
                <Field
                  name="username"
                  component={renderInput}
                  label={translate("ra.auth.username")}
                  disabled={isLoading}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="password"
                  component={renderInput}
                  label={translate("ra.auth.password")}
                  type="password"
                  disabled={isLoading}
                />
              </div>
            </div>
            <CardActions className={classes.actions}>
              <Button
                variant="flat"
                type="submit"
                color="primary"
                disabled={isLoading}
                className={classes.button}
                fullWidth
              >
                {isLoading && <CircularProgress size={35} thickness={2} />}
                {translate("ra.auth.sign_in")}
              </Button>
            </CardActions>
          </form>
        </Card>
        <Notification />
      </div>
    );
  }
}

CustomLogin.propTypes = {
  ...propTypes,
  classes: PropTypes.shape({
    main: PropTypes.string,
    card: PropTypes.string,
    avatar: PropTypes.string,
    hint: PropTypes.string,
    form: PropTypes.string,
    input: PropTypes.string,
    actions: PropTypes.string
  }).isRequired,
  translate: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
  translateDecorator,
  reduxForm({
    form: "signIn",
    validate: (values, props) => {
      const errors = {};
      const { translate } = props;
      if (!values.username) {
        errors.username = translate("ra.validation.required");
      }
      if (!values.password) {
        errors.password = translate("ra.validation.required");
      }
      return errors;
    }
  }),
  connect(
    mapStateToProps,
    { userLogin: userLoginAction }
  ),
  withStyles(styles)
);

export default enhance(CustomLogin);
