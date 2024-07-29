import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserPreferences = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const preferences = useSelector(
    (store) => store.preferences.userPreferences[0]
  );
  const family = useSelector((store) => store.familyReducer);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!preferences) {
      dispatch({ type: "FETCH_USER_PREFERENCES", payload: { userId: userId } });
    }

    dispatch({ type: "FETCH_FAMILY", payload: userId })
  }, []);

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
  );
};

export default UserPreferences;
