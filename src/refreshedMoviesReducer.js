

import { REFRESH_MOVIES_SUCCESS } from './RefreshMoviesAction';

export default (previousState = [], { type, payload }) => {
    if (type === REFRESH_MOVIES_SUCCESS) {
        //payload shape: {data: Array(20), total: 20}
        return {...payload};
    }
    return previousState;
}
