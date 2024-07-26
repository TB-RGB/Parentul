import { useEffect } from "react" 
import { useDispatch, useSelector } from "react-redux"


const UserPreferences = () => {
    const dispatch = useDispatch();
    const preferences = useSelector(store => store.preferences.userPreferences[0]);
    const family = useSelector(store => store.familyReducer);
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PREFERENCES', payload:{userId: user.id} });
    }, [dispatch, user.id]);

    return (
        <>
            <h1>User Preferences</h1>
            <p>Notifications</p>
            {/* <p>Email: {preferences.notifications_email}</p>
            <p>SMS: {preferences.notifications_sms}</p>
            <p>Push: {preferences.notifications_push}</p>
            <p>Frequency: {preferences.notifications_freq}</p> */}
            <pre>{JSON.stringify(preferences, null, 2)}</pre>
            <pre>{JSON.stringify(family, null, 2)}</pre>
          
            
        </>
    )
}

export default UserPreferences