
import React from 'react';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { Admin, Resource } from 'react-admin';
import { UserList } from './users';
import { MovieShow } from './movies';
import MovieList from './MovieList';
import { GenreList } from './genres';
import Menu from './Menu';
import customRoutes from './customRoutes';
import authProvider from './authProvider';

import themoviedbDataProvider from './themoviedbDataProvider';

const dataProvider = themoviedbDataProvider;

const App = () => (
    <Admin menu={Menu} authProvider={authProvider} customRoutes={customRoutes} dataProvider={dataProvider}>
        <Resource name="movies" show={MovieShow} list={MovieList} />
        <Resource name="genres" list={GenreList} />
    </Admin>
);

export default App;
