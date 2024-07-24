import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />
<GoogleSignIn />
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
