import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const GoogleSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSuccess = async (response) => {
    setIsLoading(true);
    try {
      const token = response.credential;
    //   console.log("google token", token)
      await dispatch({ type: 'GOOGLE_LOGIN', payload: { token } });
      setError(null);
      history.replace('/user'); // Use replace instead of push to avoid the same path issue
    } catch (err) {
      console.error('Error during Google login:', err);
      setError('Failed to process login information.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFailure = (error) => {
    console.error('Login Failed:', error);
    setError('Login failed. Please try again.');
    setIsLoading(false);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
