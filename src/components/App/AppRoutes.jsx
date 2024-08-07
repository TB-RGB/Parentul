import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ChatComponent from '../Chat/ChatComponent';
import ChatHistory from '../Chat/ChatHistory';
import ChatHistoryDetails from '../Chat/ChatHistoryDetails';
import UserPreferences from '../UserPreferences/UserPreferences';
import FAQ from '../FAQ/FAQ';
import FirstTimeSetup from '../FirstTimeSetup/FirstTimeSetup';

function AppRoutes() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const children = useSelector((store) => store.familyReducer.children);

  useEffect(() => {
    if (user.id) {
      dispatch({ type: "FETCH_FAMILY", payload: user.id });
    }if (user.id){
    dispatch({ type: 'FETCH_FAMILY', payload: user.id });
    }
  }, [user, history])

  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <ProtectedRoute exact path="/user">
        <Redirect to="/firsttime" />
      </ProtectedRoute>
      <Route exact path="/login">
        {user.id ? <Redirect to="/firsttime" /> : <LoginPage />}
      </Route>
      <Route exact path="/registration">
        {user.id ? <Redirect to="/firsttime" /> : <RegisterPage />}
      </Route>
      <Route exact path="/home">
        {user.id ? <Redirect to="/firsttime" /> : <RegisterPage />}
      </Route>
      <Route path="/chat">
        {children.length > 0 && user.id ? (
          <ChatComponent />
        ) : user.id && children.length === 0 ? (
          <FirstTimeSetup />
        ) : (
          <LoginPage />
        )}
      </Route>
      <Route exact path="/chathistory/:userId" component={ChatHistory} />
      <Route exact path="/chatlog/:chatId" component={ChatHistoryDetails} />
      <Route exact path="/preferences/:userId" component={UserPreferences} />
      <Route exact path="/questions" component={FAQ} />
      <Route exact path="/firsttime">
        {user.id ? <FirstTimeSetup /> : <LoginPage />}
      </Route>
      <Route>
        <h1>404</h1>
      </Route>
    </Switch>
  );
}

export default AppRoutes;
