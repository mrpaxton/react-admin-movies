import React from "react";
import PropTypes from "prop-types";
import StackGrid from "react-stack-grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import {
  Filter,
  GET_LIST,
  List,
  Loading,
  RichTextField,
  ShowButton,
  TextInput
} from "react-admin";
import { connect } from "react-redux";
import SmileyIcon from "@material-ui/icons/SentimentSatisfied";
import MovieIcon from "@material-ui/icons/Movie";
import themoviedbDataProvider from "./themoviedbDataProvider";
import ReleaseDatePicker from "./ReleaseDatePicker";
import ReviewsDialog from "./ReviewsDialog";
import { refreshMoviesAction } from "./actions";

const queryString = require("query-string");

const cardStyle = {
  width: 400,
  minHeight: 700,
  margin: "0.2em",
  paddingBottom: "0.5em",
  display: "inline-block",
  verticalAlign: "top"
};

const cardMediaStyle = {
  margin: "auto",
  display: "block",
  width: "100%",
  height: 500,
  zIndex: 2
};

const MovieGrid = ({ basePath, movies = [], genres = [] }) => (
  <StackGrid
    style={{ marginTop: 20 }}
    appearDelay={150}
    duration={700}
    columnWidth={400}
    gutterWidth={10}
    gutterHeight={5}
  >
    {movies.map(movie => (
      <Card key={movie.id} style={cardStyle}>
        {movie.image_path && (
          <CardMedia style={cardMediaStyle} image={movie.image_path} />
        )}
        <MovieIcon
          align="center"
          style={{ float: "left", margin: "30px 0 0 12px" }}
        />
        <CardHeader title={movie.title} subheader={movie.release_date} />
        <CardContent>
          <SmileyIcon style={{ float: "left" }} />
          <Typography
            variant="subheading"
            align="left"
            style={{ marginLeft: "30px" }}
            paragraph
            color="textSecondary"
          >
            {movie.vote_average}
          </Typography>
          {movie.genreIds.map(genreId => (
            <Chip
              key={genreId}
              label={genres.find(g => g.id === genreId).name}
            />
          ))}
          <RichTextField
            style={{ marginTop: "20px" }}
            record={movie}
            source="short_overview"
          />
        </CardContent>
        <CardActions>
          <ShowButton label="Details" basePath={basePath} record={movie} />
          <ReviewsDialog movieId={movie.id} movieTitle={movie.title} />
        </CardActions>
      </Card>
    ))}
  </StackGrid>
);

MovieGrid.defaultProps = {
  movies: [],
  genres: [],
  basePath: ""
};

MovieGrid.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.arrayOf(PropTypes.object),
  basePath: PropTypes.string
};

const withInitialData = MovieList =>
  class extends React.Component {
    DEFAULT_RELEASE_DATE_FILTER = "2015-01-01";

    state = {
      isLoading: true,
      genres: [],
      releaseDateAfter: this.DEFAULT_RELEASE_DATE_FILTER
    };

    updateMovies(params = { ...this.state.releaseDateAfter }) {
      const { refreshMovies } = this.props;
      const dataProvider = themoviedbDataProvider;

      // dispatch action to refresh movies
      refreshMovies(params);

      // get all genres only once and save to local state
      this.setState({ isLoading: true });
      dataProvider(GET_LIST, "genres")
        .then(
          result => {
            this.setState({ genres: result.data, isLoading: false });
          },
          error => {
            // console.error("Genre Info Error: " + error);
          }
        )
        .catch(e => {
          // console.error(e);
        });
    }

    componentWillReceiveProps(nextProps) {
      // observe query: if there's a change in search query in props, update movies
      if (
        JSON.stringify(this.props.location.search) !==
        JSON.stringify(nextProps.location.search)
      ) {
        const query = queryString.parse(nextProps.location.search);
        if (query.filter) {
          const queryFilter = JSON.parse(query.filter);
          this.updateMovies({ query: queryFilter.q });
        }
      }
    }

    componentDidMount() {
      this.updateMovies();
    }

    render() {
      // local state contains Genre info
      // props has updated movies from the reducer from Redux store
      const { releaseDateAfter, ...state } = this.state;
      return (
        <div>
          <ReleaseDatePicker />
          <MovieList {...state} {...this.props} />
        </div>
      );
    }
  };

const MovieFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Movies" source="q" alwaysOn />
  </Filter>
);

const MovieList = ({ refreshMovies, isLoading, genres, movies, ...props }) =>
  isLoading ? (
    <Loading key="loading-movies" />
  ) : movies.length > 0 && genres.length > 0 ? (
    <div>
      <List titlte="Movies" perPage={10} filters={<MovieFilter />} {...props}>
        <MovieGrid
          refreshMovies={refreshMovies}
          movies={movies}
          genres={genres}
        />
      </List>
    </div>
  ) : (
    <Typography>Cannot load movies. Try again later!</Typography>
  );

MovieList.propTypes = {
  refreshMovies: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired
};

const moviesDataMapper = movie => ({
  id: movie.id,
  title: movie.title,
  image_path: movie.image_path,
  release_date: movie.release_date,
  overview: movie.overview,
  short_overview: movie.short_overview,
  vote_average: movie.vote_average,
  genreIds: movie.genre_ids
});

const mapStateToProps = state => ({
  movies: !state.refreshedMoviesReducer.data
    ? []
    : state.refreshedMoviesReducer.data.map(moviesDataMapper)
});

const mapActionsToProps = { refreshMovies: refreshMoviesAction };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withInitialData(MovieList));
