const initialState = {
  firstName: "",
  lastName: "",
  children: [],
  hasDiagnosis: false,
};

const firstTimeSetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FIRST_TIME_SETUP_DATA":
      return { ...state, ...action.payload };
    case "CLEAR_FIRST_TIME_SETUP":
      return initialState;
    default:
      return state;
  }
};

export default firstTimeSetupReducer;
