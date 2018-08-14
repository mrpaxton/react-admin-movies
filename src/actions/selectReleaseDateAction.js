export const SELECT_RELEASE_DATE = "SELECT_RELEASE_DATE";

export const selectReleaseDateAction = selectedReleaseDate => ({
  type: SELECT_RELEASE_DATE,
  payload: { selectedReleaseDate }
});
