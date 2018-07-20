
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import { GET_LIST, List, Loading, RichTextField, ShowButton } from 'react-admin';
import themoviedbDataProvider from './themoviedbDataProvider';
import { connect } from 'react-redux';
import ReleaseDatePicker from './ReleaseDatePicker';
import { Filter, TextInput } from 'react-admin';

const queryString = require('query-string');


const cardStyle = {
    width: 400,
    minHeight: 800 ,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const cardMediaStyle = {
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: 500,
    zIndex: 5
};

const MovieGrid = ({basePath, movies=[], genres=[]}) => (
    <div style={{ margin: '1em' }}>
        {movies.map(movie => (
            <Card key={movie.id} style={cardStyle}>
                <CardMedia style={cardMediaStyle} image={movie.image_path} />
                <CardHeader
                    title={movie.title} subheader={movie.release_date} />
                <CardContent>
                    <Typography variant='caption' color='textSecondary'>{movie.vote_average}</Typography>
                    {movie.genre_ids.map( genre_id =>
                        <Chip key={genre_id} label={ genres.find(g => (g.id === genre_id)).name } />
                    )}
                    <RichTextField record={movie} source="overview" />
                </CardContent>
                <CardActions >
                    <ShowButton label="Details" basePath={basePath} record={movie} ></ShowButton>
                </CardActions>
            </Card>
        ))}
    </div>
);

MovieGrid.defaultProps = {
    movies: [],
    genres: [],
}


const withGenreData = MovieList =>

    class extends List{

        state = {isLoading: true, genres: [], movies: [], release_date_after: "2013-01-01" };

        updateMovies(params = {}) {

            const dataProvider = themoviedbDataProvider;
            const { page, query } = params;

            this.setState({isLoading: true});
            //Call the dataProvider to get movies first time only
            //if (this.state.movies.length === 0 && this.state.release_date_after) {
                dataProvider(GET_LIST, 'movies', {page: page || 1, query: query, release_date_after: this.state.release_date_after })
                    .then((result) => result.data)
                    .then((movies) => movies.map(moviesDataMapper))
                    .then((movies) => {
                        console.log("In container after fetching api data: ");
                        console.log(movies);
                        this.setState({ movies: movies });
                        dataProvider(GET_LIST, 'genres')
                            .then((result) => {
                                this.setState({ genres: result.data, isLoading: false });
                            }, (error) => {
                                console.log("Data Provider Error: " + error);
                            })
                            .catch( (e) => {
                                console.log(e);
                            });
                    });
            //}
        }

        componentWillReceiveProps(nextProps) {
            if ( JSON.stringify( this.props.location.search ) !==
                 JSON.stringify( nextProps.location.search )) {
                const query = queryString.parse(nextProps.location.search);
                if (query.filter) {
                    const queryFilter = JSON.parse(query.filter)
                    this.updateMovies({ query: queryFilter.q });
                }
            }
        }

        componentDidMount() {
            this.updateMovies();
        }

        render() {
            //Extract the movies updated by the redux's store, the updated value from the reducer
            const { movies } = this.props;
            return (
                <div>
                    <ReleaseDatePicker />
                    <MovieList {...this.props} {...this.state}
                        movies={movies.length === 0 ? this.state.movies : movies } />
                </div>
            );
        }
    }

const MovieFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search Movies" source="q" alwaysOn />
    </Filter>
);

const MovieList = (props) => {
    const { isLoading, genres, movies } = props;
    if (isLoading) {
        return (
            <Loading key="loading-movies" />
        );
    } else if (movies.length > 0 && genres.length > 0) {
        return (
            <List title="All Movies" filters={<MovieFilter />} {...props}>
                <MovieGrid movies={movies} genres={genres} />
            </List>
        );
    } else {
        return (
            <Typography>Cannot load movies. Try again later!</Typography>
        );
    }
};

const moviesDataMapper = movie => Object.assign({}, {
    id: movie.id,
    title: movie.title,
    image_path: movie.image_path,
    release_date: movie.release_date,
    overview: movie.overview,
    vote_average: movie.vote_average,
    genre_ids: movie.genre_ids,
});

const mapStateToProps = state => ({
    movies: !state.refreshedMovies.data ? [] : state.refreshedMovies.data.map(moviesDataMapper)
});

export default connect(mapStateToProps, {} )(withGenreData(MovieList));
