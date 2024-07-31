import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Card, Checkbox, FormControlLabel } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CustomStepIcon from './CustomStepIcon';
import muiCustomStyles from '../../styles/muiCustomStyles';

const FirstTimeSetup = () => {
  const user = useSelector(state => state.user);
  const firstTimeSetup = useSelector(state => state.firstTimeSetupReducer);
  const family = useSelector(state => state.familyReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [children, setChildren] = useState([{ name: '', dob: '' }]);
  const [hasDiagnosis, setHasDiagnosis] = useState(false);

  useEffect(() => {
    if (family.parent.firstName && family.parent.lastName && family.children && family.children.length > 0) {
      history.replace('/chat');
    }
  }, [family, history]);

  const handleAddChild = () => {
    setChildren([...children, { name: '', dob: '' }]);
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = children.map((child, i) => 
      i === index ? { ...child, [field]: value } : child
    );
    setChildren(updatedChildren);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!firstName.trim() || !lastName.trim()) {
        alert('Please enter both first name and last name');
        return;
      }
    } else if (activeStep === 1) {
      if (!children.every(child => child.name.trim() && child.dob)) {
        alert('Please fill in all child information');
        return;
      }
    } else if (activeStep === 2) {
      
    } else if (activeStep === 3) {
      dispatch({ 
        type: 'SET_FIRST_TIME_SETUP_DATA',
        payload: { firstName, lastName, children, hasDiagnosis }
      });
      dispatch({ type: 'FINALIZE_FIRST_TIME_SETUP' });
      dispatch({ type: 'CREATE_USER_PREFERENCES', payload: { userId: user.id} });
      history.push('/chat');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: 'Your Name',
      content: (
        <>
          <TextField
            sx={muiCustomStyles.textField}
            fullWidth
            margin="normal"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            sx={muiCustomStyles.textField}
            fullWidth
            margin="normal"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </>
      ),
    },
    {
      label: 'Your Children',
      content: (
        <>
          {children.map((child, index) => (
            <div key={index}>
              <TextField
                sx={muiCustomStyles.textField}
                fullWidth
                margin="normal"
                label={`Child ${index + 1} Name`}
                value={child.name}
                onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                required
              />
              <TextField
                sx={muiCustomStyles.textField}
                fullWidth
                margin="normal"
                type="date"
                label="Date of Birth"
                value={child.dob}
                onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </div>
          ))}
          <IconButton onClick={handleAddChild} color="primary">
            <AddIcon />
          </IconButton>
        </>
      ),
    },
    {
      label: 'Diagnosis in the Family?',
      content: (
        <FormControlLabel
          control={
            <Checkbox
              checked={hasDiagnosis}
              onChange={(e) => setHasDiagnosis(e.target.checked)}
              sx={muiCustomStyles.checkbox}
            />
          }
          label="Is there a diagnosis in the family?"
        />
      ),
    },
    {
      label: 'Verify Your Information',
      content: (
        <>
          <Typography>Name: {firstName} {lastName}</Typography>
          
          <Typography variant="h6" style={{ marginTop: '16px' }}>Children:</Typography>
          {children.map((child, index) => (
            <div key={index}>
              <Typography>Name: {child.name}</Typography>
              <Typography>Date of Birth: {child.dob}</Typography>
            </div>
          ))}
          <Typography>Diagnosis in Family: {hasDiagnosis ? 'Yes' : 'No'}</Typography>
        </>
      ),
    },
  ];

  return (
    <Box sx={muiCustomStyles.box}>
      <Card sx={muiCustomStyles.card}>
        <Typography variant="h4" gutterBottom>
          First Time Setup
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                sx={muiCustomStyles.stepLabel}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.content}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={muiCustomStyles.continueButton}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={muiCustomStyles.backButton}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Card>
    </Box>
  );
};

export default FirstTimeSetup;