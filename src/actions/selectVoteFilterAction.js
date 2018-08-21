export const SELECT_VOTE_FILTER = "SELECT_VOTE_FILTER";

export const selectVoteFilterAction = selectedVoteNumber => ({
  type: SELECT_VOTE_FILTER,
  payload: { selectedVoteNumber }
});
