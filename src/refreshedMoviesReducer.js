

import { REFRESH_MOVIES_SUCCESS } from './RefreshMoviesAction';

export default (previousState = [], { type, payload }) => {
    if (type === REFRESH_MOVIES_SUCCESS) {
        //payload is an object that has data of array of movies: {data: Array(20), total: 20}
        return {...payload, foo: 42};
    }
    return previousState;
}
