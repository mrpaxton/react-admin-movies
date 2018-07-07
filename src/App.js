
//import PostIcon from '@material-ui/icons/Book';
//import UserIcon from '@material-ui/icons/Group';
//import { UserList } from './users';
import React from 'react';
import { Admin, Resource } from 'react-admin';
import MovieList from './MovieList';
import MovieShow from './MovieShow';
import { GenreList } from './genres';
import Menu from './Menu';
import customRoutes from './customRoutes';
import authProvider from './authProvider';

import themoviedbDataProvider from './themoviedbDataProvider';

const dataProvider = themoviedbDataProvider;

const App = () => (
    <Admin menu={Menu} authProvider={authProvider} customRoutes={customRoutes} dataProvider={dataProvider}>
        <Resource name="movies" list={MovieList} show={MovieShow} />
        <Resource name="genres" list={GenreList} />
    </Admin>
);

export default App;
