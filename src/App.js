
import React from 'react';
import { Admin, Resource } from 'react-admin';
import MovieList from './MovieList';
import MovieShow from './MovieShow';
import { GenreList } from './GenreList';
import Menu from './Menu';
import customRoutes from './CustomRoutes';
import authProvider from './authProvider';
import themoviedbDataProvider from './themoviedbDataProvider';
import refreshedMoviesReducer from './refreshedMoviesReducer';

const dataProvider = themoviedbDataProvider;


const App = () => (
    <Admin
        customReducers={{refreshedMoviesReducer}}
        menu={Menu}
        authProvider={authProvider}
        customRoutes={customRoutes}
        dataProvider={dataProvider}
    >
        <Resource name="movies" list={MovieList} show={MovieShow} />
        <Resource name="genres" list={GenreList} />
    </Admin>
);

export default App;
