import { REFRESH_MOVIES_SUCCESS } from "./refreshMoviesAction";

export default (previousState = [], action) => {
  const { type, payload } = action;
  if (type === REFRESH_MOVIES_SUCCESS) {
    // payload has the output from API call, shape: {data: Array(20), total: 20}
    return { ...payload };
  }
  return previousState;
};
