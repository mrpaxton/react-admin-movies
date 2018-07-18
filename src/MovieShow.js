
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
    SingleFieldList,
    SimpleShowLayout,
} from 'react-admin';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import themoviedbDataProvider from './themoviedbDataProvider';
import compose from 'recompose/compose';


const withCastData = MovieShow => (

    class extends React.Component {

        state = { isLoading: true, cast: [] };

        componentDidMount() {

            const { match } = this.props;
            const dataProvider = themoviedbDataProvider;
            this.setState({isLoading: true});
            dataProvider('GET_LIST', 'casts', { movie_id: match.params.id })
                .then(result => result.data)
                .then(cast => {
                    this.setState({cast: cast, isLoading: false});
                });
        }

        render() {
            return (
                <MovieShow {...this.props} {...this.state} />
            );
        }
    }
);

const styles = {
  //override the style of Tab by using style={styles.tab} in <Tab ...>
  tab: {
      padding: '2em 1em 1em 1em'
  },
  //overriding image style of the ImageField by passing prop classes={classes} in <ImageField ...>
  image: {
    margin: '1rem',
    maxHeight: '30rem',
    maxWidth: '25%',
  },
};

const MovieTitle = ({ record }) => (
    <span>{record ? `${record.title}` : ''}</span>
);

const MovieShow = (props) => {

    const { match, classes, isLoading, cast, record } = props;

    //hacky es6 way to drop image or tab from classes
    const { image, ...tabClasses } = classes;
    const { tab, ...imageClasses } = classes;

    return isLoading ? <Loading /> : (
        <Show title={<MovieTitle />} {...props}>
            <TabbedShowLayout classes={tabClasses} >
                <Tab label="Summary" >
                    <ImageField source="image_path" classes={imageClasses} />
                    <TextField source="tagline" addLabel={false} style={{color: 'purple', fontSize: '2rem'}} />
                    <DateField label="Release Date" source="release_date"
                        options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}  />
                    <Divider />
                    { cast.slice(0, 7).map( celeb => (
                        <div style={{display: 'inline-block', float: 'left', padding: '1em'}} key={"Celeb-Avatar-" + celeb.id} >
                            <Avatar
                                alt={celeb.character}
                                src={celeb.profile_path}
                                style={{width: '75px', height: '75px' }}
                            />
                            <Typography variant="title" color="primary">{celeb.name}</Typography>
                            <Typography variant="subheading" color="textSecondary">
                                {celeb.character ? `as ${celeb.character}` : `No character info`}
                            </Typography>
                        </div>
                    )) }
                </Tab>
                <Tab label="Overview">
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
};

//MovieShow.propTypes = {
    //classes: PropTypes.object.isRequired,
//};

const enhance = compose(
    withStyles(styles),
);

export default withCastData(enhance(MovieShow));
