import React from "react";
import { Admin, Resource } from "react-admin";
import MovieList from "./MovieList";
import MovieShow from "./MovieShow";
import GenreList from "./GenreList";
import Menu from "./Menu";
import CustomLogin from "./CustomLogin";
import customRoutes from "./CustomRoutes";
import authProvider from "./authProvider";
import themoviedbDataProvider from "./themoviedbDataProvider";
import refreshedMoviesReducer from "./reducers/refreshedMoviesReducer";
import selectedReleaseDateReducer from "./reducers/selectedReleaseDateReducer";

const dataProvider = themoviedbDataProvider;

const App = () => (
  <Admin
    customReducers={{ refreshedMoviesReducer, selectedReleaseDateReducer }}
    menu={Menu}
    authProvider={authProvider}
    loginPage={CustomLogin}
    customRoutes={customRoutes}
    dataProvider={dataProvider}
  >
    <Resource name="movies" list={MovieList} show={MovieShow} />
    <Resource name="genres" list={GenreList} />
  </Admin>
);

export default App;
