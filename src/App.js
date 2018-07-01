
import React from 'react';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';
import { UserList } from './users';
import { MovieList, MovieShow } from './movies';
import { GenreList } from './genres';
import Menu from './Menu';
import customRoutes from './customRoutes';
import authProvider from './authProvider';
import jsonServerProvider from 'ra-data-json-server';

import themoviedbDataProvider from './themoviedbDataProvider';

//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
        //<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        //<Resource name="users" list={UserList} icon={UserIcon} />
//
const dataProvider = themoviedbDataProvider;

const App = () => (
    <Admin menu={Menu} authProvider={authProvider} customRoutes={customRoutes} dataProvider={dataProvider}>
        <Resource name="movies" show={MovieShow} list={MovieList} />
        <Resource name="genres" list={GenreList}/>
    </Admin>
);

export default App;
