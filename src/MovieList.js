
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { GET_LIST, List, Loading, RichTextField, ShowButton } from 'react-admin';
import themoviedbDataProvider from './themoviedbDataProvider';
import { connect } from 'react-redux';
import ReleaseDatePicker from './ReleaseDatePicker';
import { Filter, TextInput } from 'react-admin';
import RefreshMoviesAction from './RefreshMoviesAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
const queryString = require('query-string');

//import PostIcon from '@material-ui/icons/Book';

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

//TODO: refresh button to handle the refreshMovies callback passed into the MovieGrid
const MovieGrid = ({refreshMovies, basePath, movies=[], genres=[]}) => (
    <div style={{ margin: '1em' }}>
        {movies.map(movie => (
            <Card key={movie.id} style={cardStyle}>
                <CardMedia style={cardMediaStyle} image={movie.image_path} />
                <CardHeader
                    title={movie.title} subheader={movie.release_date} />
                <CardContent>
                    <FavoriteIcon style={{display:"inline-block"}} color="secondary" />
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


const withInitialData = MovieList =>

    class extends List {

        DEFAULT_RELEASE_DATE_FILTER = "2012-01-01";
        state = {
            isLoading: true,
            genres: [],
            release_date_after: this.DEFAULT_RELEASE_DATE_FILTER
        };

        updateMovies(params = {release_date_after: this.state.release_date_after} ) {

            const { refreshMovies } = this.props;
            const dataProvider = themoviedbDataProvider;

            //dispatch action to refresh movies
            refreshMovies(params);

            //get all genres only once and save to local state
            this.setState({isLoading: true});
            dataProvider(GET_LIST, 'genres')
                .then((result) => {
                    this.setState({ genres: result.data, isLoading: false });
                }, (error) => {
                    console.error("Genre Info Error: " + error);
                })
                .catch( (e) => {
                    console.error(e);
                });
        }

        componentWillReceiveProps(nextProps) {

            //observe query: if there's a change in search query in props, update movies
            if ( JSON.stringify( this.props.location.search ) !==
                 JSON.stringify( nextProps.location.search )) {
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

            //local state contains Genre info
            //props has updated movies from the reducer from Redux store
            return (
                <div>
                    <ReleaseDatePicker />
                    <MovieList {...this.props} {...this.state} {...this.props.refreshMovies} />
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
        //removing refreshMovies from props to prevent error in List
        const { refreshMovies, ...restProps } = props;
        return (
            <List title="All Movies" filters={<MovieFilter />} {...restProps} >
                <MovieGrid refreshMovies={refreshMovies} movies={movies} genres={genres} />
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

const mapActionsToProps = { refreshMovies: RefreshMoviesAction };

export default connect(mapStateToProps, mapActionsToProps)(withInitialData(MovieList));
