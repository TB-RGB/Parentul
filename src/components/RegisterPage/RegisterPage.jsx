import React from 'react';

import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import RegisterForm from '../RegisterForm/RegisterForm';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import muiCustomStyles from '../../styles/muiCustomStyles';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          sx={muiCustomStyles.continueButton}
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
