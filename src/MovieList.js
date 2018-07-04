
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { GET_LIST, List, Loading } from 'react-admin';
import { TextField, DateField, RichTextField, SingleFieldList, ShowButton } from 'react-admin';

import PropTypes from 'prop-types';
import { push as pushAction } from 'react-router-redux';
import { connect } from 'react-redux';
import themoviedbDataProvider from './themoviedbDataProvider';

const dataProvider = themoviedbDataProvider;

const cardStyle = {
    width: 400,
    minHeight: 650,
    margin: '1em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const cardMediaStyle = {
    height: 300,
    margin: '0.1em',
    zIndex: 99
};

const MovieGrid = ({ ids, data, basePath, push, genres }) => (
    <div style={{ margin: '1em' }}>
    {ids.map(id =>
        <Card key={id} style={cardStyle}>
            <CardMedia style={cardMediaStyle}
                image={data[id]['image_path']}
            />
            <CardHeader
                title={<TextField record={data[id]} source="title" />}
                subheader={<DateField record={data[id]} source="release_date" />}
            />
            <CardContent>
                {data[id]['genre_ids'].map(genre_id =>
                    <Chip key={genre_id} label={ genres.find(g => (g.id === genre_id)).name } />
                )}
                <RichTextField record={data[id]} source="overview" addLabel={false} />
            </CardContent>
            <CardActions style={{ textAlign: 'right' }}>
                <ShowButton basePath={basePath} record={data[id]} source="id">Details</ShowButton>
            </CardActions>
        </Card>
    )}
    </div>
);

MovieGrid.defaultProps = {
    data: {},
    ids: [],
    genres: [],
}

class MovieList extends List {

    state = {isLoading: true};

    componentDidMount() {

        dataProvider(GET_LIST, 'genres')
            .then((result) => {
                this.setState({ genres: result.data, isLoading: false });
            })
            .catch( (e) => {
                console.log(e);
            });
    }

    renderMovieGrid(push, genres) {
        return (
            <List title="All Movies" {...this.props}>
                <MovieGrid push={push} genres={genres} />
            </List>
        );
    }

    renderLoading() {
        return (
            <Loading key="loading-movie-list" loadingSecondary="Loading..." />
        );
    }

    render() {

        const { push } = this.props;
        const { genres, isLoading } = this.state;

        if (isLoading) {
            return this.renderLoading();
        } else if (genres.length > 0) {
            return this.renderMovieGrid(push, genres);
        } else {
            return (<div><h2>Error</h2></div>);
        }
    }
}

MovieList.propTypes = {
    push: PropTypes.func,
};

export default connect(null, {
    push: pushAction,
})(MovieList);
