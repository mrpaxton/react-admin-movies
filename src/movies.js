

import React from 'react';
import { Show, SimpleShowLayout, List, DateField, Datagrid, EmailField, NumberField, RichTextField, TextField, ImageField, TabbedShowLayout, Tab } from 'react-admin';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

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

export const MovieList = (props) => (
    <List title="All movies" {...props}>
        <MovieGrid />
    </List>
);

//export const MovieList = (props) => (
    //<List {...props}>
        //<Datagrid>
            //<TextField source="title" />
            //<ImageField source="image_path" />
            //<TextField source="id" />
            //<TextField source="release_date" />
        //</Datagrid>
    //</List>
//);


export const MovieShow = (props) => (
    <Show title="Movie Details" {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <ImageField source="image_path" />
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="tagline" />
                <DateField label="Release Date" source="release_date"
                    options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}  />
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
