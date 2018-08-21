import { GET_LIST } from "react-admin";

export const REFRESH_MOVIES = "REFRESH_MOVIES";
export const REFRESH_MOVIES_LOADING = "REFRESH_MOVIES_LOADING";
export const REFRESH_MOVIES_SUCCESS = "REFRESH_MOVIES_SUCCESS";
export const REFRESH_MOVIES_FAILURE = "REFRESH_MOVIES_FAILURE";

export const refreshMoviesAction = (
  page,
  query,
  releaseDateAfter,
  voteFilterNumber
) => ({
  type: REFRESH_MOVIES,
  payload: { ...page, ...query, ...releaseDateAfter, ...voteFilterNumber },
  meta: {
    fetch: GET_LIST,
    resource: "movies",
    onSuccess: {
      // redirectTo: '/movies',
      // basePath,
    },
    onFailure: {}
  }
});
