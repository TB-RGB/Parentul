const jobStatusReducer = (state = null, action) => {
    switch (action.type) {
      case 'FETCH_JOB_STATUS':
        return action.payload;
      case 'FETCH_JOB_STATUS_FAILED':
        return { error: action.error };
      default:
        return state;
    }
  };
  
  export default jobStatusReducer;