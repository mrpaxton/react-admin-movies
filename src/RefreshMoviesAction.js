
import { GET_LIST } from 'react-admin';

export const REFRESH_MOVIES = 'REFRESH_MOVIES';
export const REFRESH_MOVIES_LOADING = 'REFRESH_MOVIES_LOADING';
export const REFRESH_MOVIES_SUCCESS = 'REFRESH_MOVIES_SUCCESS';
export const REFRESH_MOVIES_FAILURE = 'REFRESH_MOVIES_FAILURE';


export default (page, query, release_date_after, basePath) => {
    return ({
        type: REFRESH_MOVIES,
        payload: {...page, ...query, ...release_date_after},
        meta: {
            fetch: GET_LIST,
            resource: 'movies',
            onSuccess: {
                //redirectTo: '/movies',
                //basePath,
            },
            onFailure: {
            },
        },
    });
}

