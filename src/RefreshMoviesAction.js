
import { GET_LIST } from 'react-admin';

export const REFRESH_MOVIES = 'REFRESH_MOVIES';
export const REFRESH_MOVIES_LOADING = 'REFRESH_MOVIES_LOADING';
export const REFRESH_MOVIES_SUCCESS = 'REFRESH_MOVIES_SUCCESS';
export const REFRESH_MOVIES_FAILURE = 'REFRESH_MOVIES_FAILURE';

export default (release_date_after, basePath) => {
    return ({
        type: REFRESH_MOVIES,
        payload: {...release_date_after},
        meta: {
            resource: 'movies',
            fetch: GET_LIST,
            onSuccess: {
                redirectTo: '/movies',
                basePath,
            },
            onFailure: {
            },
        },
    });
}
