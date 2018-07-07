
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { GET_LIST, List, Loading, TextField, DateField, RichTextField, SingleFieldList, ShowButton } from 'react-admin';
import themoviedbDataProvider from './themoviedbDataProvider';


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
    width: '80%',
    height: 300,
    zIndex: 9
};

                    //<TextField record={movie} source="vote_average" />

const MovieGrid = ({basePath, movies=[], genres=[]}) => (
    <div style={{ margin: '1.5em' }}>
        {movies.map(movie => (
            <Card key={movie.id} style={cardStyle}>
                <CardMedia style={cardMediaStyle} image={movie.image_path} />
                <CardHeader
                    title={movie.title} subheader={movie.release_date} />
                <CardContent>
                    <Typography variant='subheading' color='secondary'>{movie.vote_average}</Typography>
                    {movie.genre_ids.map( genre_id =>
                        <Chip key={genre_id} label={ genres.find(g => (g.id == genre_id)).name } />
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

    class extends React.Component {

        state = {isLoading: true, genres: [], movies: [] };

        componentDidMount() {

            const dataProvider = themoviedbDataProvider;

            dataProvider(GET_LIST, 'movies')
                .then((result) => result.data)
                .then((movies) => movies.map((movie) => Object.assign({}, {
                    id: movie.id,
                    title: movie.title,
                    image_path: movie.image_path,
                    release_date: movie.release_date,
                    overview: movie.overview,
                    vote_average: movie.vote_average,
                    genre_ids: movie.genre_ids,
                })))
                .then((movies) => {
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
        }

        render() {
            return <MovieList {...this.props} {...this.state} />;
        }
    }


const MovieList = (props) => {
    const { isLoading, genres, movies } = props;
    if (isLoading) {
        return (
            <Loading key="loading-movies" loadingSecondary="Movie info will be ready shortly" />
        );
    } else if (movies.length > 0 && genres.length > 0) {
        return (
            <List title="All Movies" {...props}>
                <MovieGrid movies={movies} genres={genres} />
            </List>
        );
    } else {
        return (<div><h2>Error</h2></div>);
    }
};

export default withGenreData(MovieList);
