import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import Header from '../Header/Header';
import muiCustomStyles from '../../styles/muiCustomStyles';


function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <LoginForm />

      <center>
        <Button
        sx={muiCustomStyles.continueButton}
          
          
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
