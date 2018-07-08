
import React from 'react';
import {
    Show,
    List,
    DateField,
    NumberField,
    RichTextField,
    TextField,
    ImageField,
    TabbedShowLayout,
    Tab,
    ReferenceArrayField,
    SingleFieldList
} from 'react-admin';
import Avatar from '@material-ui/core/Avatar';
import themoviedbDataProvider from './themoviedbDataProvider';


const withCastData = MovieShow =>

    class extends React.Component {

        state = { isLoading: true, casts: [] };

        componentDidMount() {

            const { match } = this.props;

            console.log("in show view, match.params.id: ");
            console.log(match.params.id);

            const dataProvider = themoviedbDataProvider;

            dataProvider('GET_LIST', 'casts', { movie_id: match.params.id })
                .then(result => result.data)
                .then(casts => {
                    this.setState({casts: casts});
                })

        }

        render() {
            console.log("after getting casts: ");
            console.log(this.state);
            return (
                <MovieShow {...this.props} />
            );
        }
    }

const MovieShow = (props) => (
    <Show title="Movie Details" {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <ImageField source="image_path" />
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="tagline" />
                <DateField label="Release Date" source="release_date"
                    options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}  />
                <Avatar src="https://robohash.org/yoyo?size=150x150" />
                <Avatar src="https://robohash.org/yoyo?size=150x150" />
                <Avatar src="https://robohash.org/yoyo?size=150x150" />
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

export default withCastData(MovieShow);
