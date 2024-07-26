import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const FirstTimeSetup = () => {
  const user = useSelector(state => state.user);
  const firstTimeSetup = useSelector(state => state.firstTimeSetupReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [children, setChildren] = useState([{ name: '', dob: '' }]);

  useEffect(() => {
    if (user.first_name && user.last_name && user.children && user.children.length > 0) {
      history.push('/chat');
    }
  }, [user, history]);

  const handleAddChild = () => {
    setChildren([...children, { name: '', dob: '' }]);
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = children.map((child, i) => 
      i === index ? { ...child, [field]: value } : child
    );
    setChildren(updatedChildren);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      console.log('Dispatching SET_FIRST_TIME_SETUP_DATA with:', { firstName, lastName, children });
      dispatch({ 
        type: 'SET_FIRST_TIME_SETUP_DATA',
        payload: { firstName, lastName, children }
      });
      setStep(3);
    } else {
      dispatch({ type: 'FINALIZE_FIRST_TIME_SETUP' });
      history.push('/chat')
    }
  };

  const renderVerificationStep = () => (
    <>
      <h3>Verify Your Information</h3>
      <p>First Name: {firstTimeSetup?.firstName || 'Not provided'}</p>
      <p>Last Name: {firstTimeSetup?.lastName || 'Not provided'}</p>
      <h4>Children:</h4>
      {firstTimeSetup?.children?.length > 0 ? (
        firstTimeSetup.children.map((child, index) => (
          <div key={index}>
            <p>Name: {child.name || 'Not provided'}</p>
            <p>Date of Birth: {child.dob || 'Not provided'}</p>
          </div>
        ))
      ) : (
        <p>No children added</p>
      )}
    </>
  );

  return (
    <div>
      <h2>First Time Setup</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h3>Step 1: Your Name</h3>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </>
        )}
        {step === 2 && (
          <>
            <h3>Step 2: Your Children</h3>
            {children.map((child, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                  placeholder="Child's Name"
                  required
                />
                <input
                  type="date"
                  value={child.dob}
                  onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddChild}>Add Another Child</button>
          </>
        )}
        {step === 3 && renderVerificationStep()}
        <button type="submit">
          {step === 1 ? 'Next' : step === 2 ? 'Review' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FirstTimeSetup;