import { useSelector } from "react-redux";


const redirectionReducer = (state = null, action) => {


    const user = useSelector(state => state.user)
    switch (action.type) {
      case 'REDIRECT_TO_PREFERENCES':
        return `/preferences/${user.id}`;
      case 'CLEAR_REDIRECTION':
        return null;
      default:
        return state;
    }
  };
  
  export default redirectionReducer;