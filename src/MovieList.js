
import React from 'react';
import StackGrid from 'react-stack-grid';
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
import refreshMoviesAction from './RefreshMoviesAction';
import SmileyIcon from '@material-ui/icons/SentimentSatisfied';
import MovieIcon from '@material-ui/icons/Movie';
const queryString = require('query-string');


const cardStyle = {
    width: 400,
    minHeight: 700 ,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const cardMediaStyle = {
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: 500,
    zIndex: 2
};

//TODO: refresh button to handle the refreshMovies callback passed into the MovieGrid
const MovieGrid = ({refreshMovies, basePath, movies=[], genres=[]}) => (
    <StackGrid style={{marginTop: 70}} appearDelay={150} duration={700} columnWidth={400} gutterWidth={10} gutterHeight={5} >
        {movies.map(movie => (
            <Card key={movie.id} style={cardStyle}>
                { movie.image_path && <CardMedia style={cardMediaStyle} image={movie.image_path} /> }
                <MovieIcon align="center" style={{float: "left", margin: "30px 0 0 12px"}} />
                <CardHeader
                    title={movie.title} subheader={movie.release_date} />
                <CardContent>
                    <SmileyIcon style={{float: "left"}} />
                    <Typography variant="subheading" align="left" style={{marginLeft: "30px"}}
                        paragraph color='textSecondary'>{movie.vote_average}</Typography>
                    {movie.genre_ids.map( genre_id =>
                        <Chip key={genre_id} label={ genres.find(g => (g.id === genre_id)).name } />
                    )}
                    <RichTextField style={{marginTop: "20px"}} record={movie} source="short_overview" />
                </CardContent>
                <CardActions >
                    <ShowButton label="Details" basePath={basePath} record={movie} ></ShowButton>
                </CardActions>
            </Card>
        ))}
    </StackGrid>
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

        updateMovies(params = {release_date_after: this.state.release_date_after}) {

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


const MovieList = ({ refreshMovies, isLoading, genres, movies, ...restProps }) => {

    if (isLoading) {
        return (
            <Loading key="loading-movies" />
        );
    } else if (movies.length > 0 && genres.length > 0) {
        //refreshMovies() is for MovieGrid not for List
        return (
            <List title="All Movies" perPage={20} filters={<MovieFilter />} {...restProps} >
                <MovieGrid refreshMovies={refreshMovies} movies={movies} genres={genres} />
            </List>
        );
    } else {
        return (
            <Typography>Cannot load movies. Try again later!</Typography>
        );
    }

};


const moviesDataMapper = movie => ({
    id: movie.id,
    title: movie.title,
    image_path: movie.image_path,
    release_date: movie.release_date,
    overview: movie.overview,
    short_overview: movie.short_overview,
    vote_average: movie.vote_average,
    genre_ids: movie.genre_ids,
});


const mapStateToProps = state => ({
    movies: !state.refreshedMovies.data ? [] : state.refreshedMovies.data.map(moviesDataMapper)
});


const mapActionsToProps = { refreshMovies: refreshMoviesAction };


export default connect(mapStateToProps, mapActionsToProps)(withInitialData(MovieList));
