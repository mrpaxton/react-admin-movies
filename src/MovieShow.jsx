import React from "react";
import {
  Show,
  DateField,
  NumberField,
  RichTextField,
  TextField,
  ImageField,
  Loading,
  Tab,
  TabbedShowLayout
} from "react-admin";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Image from "material-ui-image";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ReactSpeedoMeter from "react-d3-speedometer";
import compose from "recompose/compose";
import themoviedbDataProvider from "./themoviedbDataProvider";

const withCastData = MovieShow =>
  class extends MovieShow {
    state = { isLoading: true, cast: [] };

    componentDidMount() {
      const { match } = this.props;
      const dataProvider = themoviedbDataProvider;
      dataProvider("GET_LIST", "casts", {
        movie_id: match.params.id
      })
        .then(result => result.data)
        .then(cast => {
          this.setState({ cast, isLoading: false });
        });
    }

    render() {
      return <MovieShow {...this.props} {...this.state} />;
    }
  };

const styles = {
  // override the style of Tab by using style={styles.tab} in <Tab ...>
  tab: {
    padding: "2em 1em 1em 2em"
  },
  // overriding image style of the ImageField by passing prop classes={classes} in <ImageField ...>
  image: {
    margin: "0.5rem",
    maxWidth: "50%",
    maxHeight: "30rem"
  }
};

const MovieTitle = ({ record }) => (
  <span>{record ? `${record.title}` : ""}</span>
);

MovieTitle.propTypes = {
  record: PropTypes.object
};

const MeterField = ({ record = {} }) => (
  <Card style={{ padding: 20, width: 400, height: 300 }}>
    <ReactSpeedoMeter
      value={record.budget > 0 ? record.revenue / record.budget : 0}
      width={400}
      height={250}
      maxValue={
        record.budget > 0 && record.revenue / record.budget < 16
          ? 16
          : Math.round(record.revenue / record.budget) + 2
      }
      minValue={-5}
      valueFormat="0.4P"
    />
    <Typography variant="headline" color="primary" align="center">
      Revenue Multiples
    </Typography>
  </Card>
);

const LogoDisplayField = ({ record = {} }) => (
  <div
    style={{
      display: "inline-block",
      width: "800px",
      height: "100px",
      margin: "20px 0 20px 0"
    }}
    key={`Logo-Display-${record.id}`}
  >
    {record.company_logos.map(logo => (
      <div
        key={`Logo-${logo}`}
        style={{
          display: "flex",
          maxWidth: "120px",
          height: "120px",
          margin: "10px 0 10px 0"
        }}
      >
        <Image
          src={logo}
          imageStyle={{
            width: "auto",
            maxWidth: "400px",
            height: "120px",
            marginRight: "20px",
            opacity: "0.75"
          }}
        />
      </div>
    ))}
  </div>
);

const MovieShow = ({ classes, isLoading, cast, ...props }) =>
  isLoading ? (
    <Loading />
  ) : (
    <Show title={<MovieTitle />} {...props}>
      <TabbedShowLayout classes={{ tab: classes.tab }}>
        <Tab label="Summary">
          <ImageField source="image_path" classes={{ image: classes.image }} />
          <TextField
            source="tagline"
            addLabel={false}
            style={{ color: "purple", fontSize: "1.5rem" }}
          />
          <DateField
            label="Release Date"
            source="release_date"
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            }}
          />
          <Divider />
          {cast.slice(0, 10).map(celeb => (
            <div
              style={{
                display: "inline-block",
                float: "left",
                padding: "1em"
              }}
              key={`Celeb-Avatar-${celeb.id}`}
            >
              <Avatar
                alt={celeb.character}
                src={celeb.profile_path}
                style={{ width: "70px", height: "70px" }}
              />
              <Typography variant="title" color="primary">
                {celeb.name}
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                {celeb.character
                  ? `as ${celeb.character}`
                  : "No character info"}
              </Typography>
            </div>
          ))}
        </Tab>
        <Tab label="Overview">
          <RichTextField source="overview" addLabel={false} />
        </Tab>
        <Tab label="Stats">
          <MeterField source="id" />
          <LogoDisplayField source="id" />
          <NumberField
            source="budget"
            options={{ style: "currency", currency: "USD" }}
          />
          <NumberField
            source="revenue"
            options={{ style: "currency", currency: "USD" }}
          />
          <NumberField
            source="popularity"
            options={{ maximumFractionDigits: 2 }}
          />
          <TextField label="Language" source="spoken_languages[0].name" />
          <NumberField source="runtime" addLabel />
          <NumberField source="vote_count" addLabel />
          <NumberField source="vote_average" addLabel />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );

MovieShow.propTypes = {
  classes: PropTypes.shape({
    tab: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  isLoading: PropTypes.bool,
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      cast_id: PropTypes.number,
      character: PropTypes.string,
      credit_id: PropTypes.string,
      gender: PropTypes.gender,
      id: PropTypes.number,
      name: PropTypes.string,
      order: PropTypes.number,
      profile_path: PropTypes.string
    })
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

MovieShow.defaultProps = {
  isLoading: false,
  cast: []
};

const enhance = compose(
  withCastData,
  withStyles(styles)
);

export default enhance(MovieShow);
