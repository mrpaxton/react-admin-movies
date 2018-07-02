
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { GET_LIST, List } from 'react-admin';
import { TextField, DateField, RichTextField } from 'react-admin';

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

const MovieGrid = ({ ids, data, basePath }) => (
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
                <RichTextField record={data[id]} source="overview" addLabel={false} />
            </CardContent>
            <CardActions style={{ textAlign: 'right' }}>
                <button>More</button>
            </CardActions>
        </Card>
    )}
    </div>
);

MovieGrid.defaultProps = {
    data: {},
    ids: [],
}

class MovieList extends List {

    state = {};

    componentDidMount() {

        const { push, showNotification } = this.props;

        dataProvider(GET_LIST, 'genres')
            .then((result) => {
                this.setState({ genres: result.data });
                showNotification('Genre data is ready');
            })
            //TODO: catch error, and show notificaiton
            .catch( (e) => {
                console.log(e);
                showNotification('Error: Cannot load Genres', 'warning');
            });
    }

    render() {
        const { genres } = this.state;
        return (
            <List title="All Movies" {...this.props}>
                <MovieGrid />
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
