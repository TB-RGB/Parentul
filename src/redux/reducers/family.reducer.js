const initialState = { parent: {}, children: [] };

const familyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAMILY':
      return {
        parent: {
          id: action.payload.id,
          firstName: action.payload.parent_first_name,
          lastName: action.payload.parent_last_name
        },
        children: action.payload.children || []
      };
    case 'UNSET_FAMILY':
      return initialState;
    default:
      return state;
  }
};

export default familyReducer;