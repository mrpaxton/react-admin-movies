
import React from 'react';
import {
    Show,
    DateField,
    NumberField,
    RichTextField,
    TextField,
    ImageField,
    Loading,
    TabbedShowLayout,
    Tab,
    ReferenceArrayField,
    SingleFieldList
} from 'react-admin';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import themoviedbDataProvider from './themoviedbDataProvider';


const withCastData = MovieShow =>

    class extends React.Component {

        state = { isLoading: true, casts: [] };

        componentDidMount() {

            const { match } = this.props;
            const dataProvider = themoviedbDataProvider;
            dataProvider('GET_LIST', 'casts', { movie_id: match.params.id })
                .then(result => result.data)
                .then(casts => {
                    this.setState({casts: casts, isLoading: false});
                });
        }

        render() {
            return (
                <MovieShow {...this.props} {...this.state} />
            );
        }
    }


const styles = {
  castCard: {
    display: 'inline-block',
    border: 'none',
    padding: '0.2em',
    margin: '0.5em',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 80,
    height: 80,
  },
  summaryCardStyles: {
    minHeight: 700,
    zIndex: 99,
  },
  image: {
    maxHeight: 700,
  },
};


const MovieShow = (props) => {
    const { match, classes, isLoading, casts } = props;

    if (!isLoading) {
    return (
        <Show title="Movie Details" {...props}>
            <TabbedShowLayout>
                <Tab label="summary">
                    <ImageField source="image_path" classes={classes} />
                    <TextField source="id" />
                    <TextField source="title" />
                    <TextField source="tagline" />
                    <DateField label="Release Date" source="release_date"
                        options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}  />
                    <Divider />
                    {casts.slice(0, 5).map(cast => (
                        <div className={classes.castCard}>
                            <Avatar
                                alt={cast.character}
                                src={cast.profile_path}
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <Typography variant="subheading" color="default">{cast.name}</Typography>
                            <Typography variant="subheading" color="default">as {cast.character}</Typography>
                        </div>
                    ))}
                </Tab>
                <Tab label="body">
                    <RichTextField source="overview" addLabel={false} />
                </Tab>
                <Tab label="Stats">
                    <NumberField source="budget" options={{ style: 'currency', currency: 'USD' }} />
                    <NumberField source="revenue" options={{ style: 'currency', currency: 'USD' }} />
                    <NumberField source="popularity" options={{ maximumFractionDigits: 2 }} />
                    <TextField label="Language" source="spoken_languages[0].name" />
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
    } else {
        return (
            <Loading />
        );
    };
};

MovieShow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withCastData(withStyles(styles)(MovieShow));
