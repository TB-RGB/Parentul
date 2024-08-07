const jobStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_JOB_STATUS":
      return action.payload;
    case "FETCH_JOB_STATUS_FAILED":
      return { error: action.error };
    default:
      return state;
  }
};

export default jobStatusReducer;
