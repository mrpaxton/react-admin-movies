
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { GET_LIST, List } from 'react-admin';
import { TextField, DateField, RichTextField, SingleFieldList } from 'react-admin';

import PropTypes from 'prop-types';
import { showNotification as showNotificationAction } from 'react-admin';
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

const MovieGrid = ({ ids, data, basePath, genres }) => (
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
                <Button>More</Button>
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

    state = {}

    componentDidMount() {

        const { push, showNotification } = this.props;

        dataProvider(GET_LIST, 'genres')
            .then((result) => {
                this.setState({ genres: result.data });
                showNotification('Genre data is ready');
            })
            .catch( (e) => {
                console.log(e);
                showNotification('Error: Cannot load Genres', 'warning');
            });

        //movies data already provided from List in the react-admin framework
    }

    render() {
        const { genres } = this.state;
        return (
            <List title="All Movies" {...this.props}>
                <MovieGrid genres={genres} />
            </List>
        )
    }
}

MovieList.propTypes = {
    push: PropTypes.func,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction,
})(MovieList);
