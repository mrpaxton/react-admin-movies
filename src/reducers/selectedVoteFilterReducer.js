import { SELECT_VOTE_FILTER } from "../actions";

export default (previousState = [], action) => {
  const { type, payload } = action;

  if (type === SELECT_VOTE_FILTER) {
    return payload.selectedVoteNumber;
  }

  return previousState;
};
