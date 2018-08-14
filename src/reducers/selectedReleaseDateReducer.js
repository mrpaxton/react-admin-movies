import { SELECT_RELEASE_DATE } from "../actions";

export default (previousState = [], action) => {
  const { type, payload } = action;

  if (type === SELECT_RELEASE_DATE) {
    return payload.selectedReleaseDate;
  }

  return previousState;
};
