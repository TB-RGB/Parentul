import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

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

  useEffect(() => {
    if (family.parent.firstName && family.parent.lastName && family.children && family.children.length > 0) {
      history.push('/chat');
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
      // Validate first name and last name
      if (!firstName.trim() || !lastName.trim()) {
        alert('Please enter both first name and last name');
        return;
      }
    } else if (activeStep === 1) {
      // Validate children
      if (!children.every(child => child.name.trim() && child.dob)) {
        alert('Please fill in all child information');
        return;
      }
      dispatch({ 
        type: 'SET_FIRST_TIME_SETUP_DATA',
        payload: { firstName, lastName, children }
      });
    } else if (activeStep === 2) {
      dispatch({ type: 'FINALIZE_FIRST_TIME_SETUP' });
      dispatch({ type: 'FETCH_FAMILY', payload: user.id });
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
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': {
                color: 'white',
                boxShadow: '1px 1px 1px black',
                borderRadius: '1em'
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: '2px outset orange',
                boxShadow: '1px 1px 1px black',
                borderRadius: '1em'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                border: '2px outset white',
                boxShadow: '1px 1px 1px black',
                borderRadius: '1em'
            },
            '& .MuiInputLabel-root': {
                color: 'orange'
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'orange'
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px outset orange',
                boxShadow: '1px 1px 1px black',
                borderRadius: '1em'
            },
            '& input::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)'
            }
        }}
            fullWidth
            margin="normal"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            '& .MuiInputBase-input': {
                color: 'white',
                boxShadow: '1px 1px 1px black',
                borderRadius: '1em'
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: '2px outset orange',
                boxShadow: '1px 1px 1px black',
                borderRadius: '1em'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                border: '2px outset white',
                boxShadow: '1px 1px 1px black',
                borderRadius: '1em'
            },
            '& .MuiInputLabel-root': {
                color: 'orange'
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'orange'
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px outset orange',
                boxShadow: '1px 1px 1px black',
                borderRadius: '1em'
            },
            '& input::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)'
            }
        }}
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
              sx={{
                color: 'white',
                borderRadius: '1em',
                width: '100%',
                '& .MuiInputBase-input': {
                    color: 'white',
                    boxShadow: '1px 1px 1px black',
                    borderRadius: '1em'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: '2px outset orange',
                    boxShadow: '1px 1px 1px black',
                    borderRadius: '1em'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: '2px outset white',
                    boxShadow: '1px 1px 1px black',
                    borderRadius: '1em'
                },
                '& .MuiInputLabel-root': {
                    color: 'orange'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'orange'
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '2px outset orange',
                    boxShadow: '1px 1px 1px black',
                    borderRadius: '1em'
                },
                '& input::-webkit-calendar-picker-indicator': {
                    filter: 'invert(1)'
                }
            }}
                fullWidth
                margin="normal"
                label={`Child ${index + 1} Name`}
                value={child.name}
                onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                required
              />
              <TextField
              sx={{
                color: 'white',
                borderRadius: '1em',
                width: '100%',
                '& .MuiInputBase-input': {
                    color: 'white',
                    boxShadow: '1px 1px 1px black',
                    borderRadius: '1em'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: '2px outset orange',
                    boxShadow: '1px 1px 1px black',
                    borderRadius: '1em'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: '2px outset white',
                    boxShadow: '1px 1px 1px black',
                    borderRadius: '1em'
                },
                '& .MuiInputLabel-root': {
                    color: 'orange'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'orange'
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '2px outset orange',
                    boxShadow: '1px 1px 1px black',
                    borderRadius: '1em'
                },
                '& input::-webkit-calendar-picker-indicator': {
                    filter: 'invert(1)'
                }
            }}
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
      label: 'Verify Your Information',
      content: (
        <>
          <Typography>First Name: {firstTimeSetup.firstName || firstName}</Typography>
          <Typography>Last Name: {firstTimeSetup.lastName || lastName}</Typography>
          <Typography variant="h6" style={{ marginTop: '16px' }}>Children:</Typography>
          {(firstTimeSetup.children || children).map((child, index) => (
            <div key={index}>
              <Typography>Name: {child.name}</Typography>
              <Typography>Date of Birth: {child.dob}</Typography>
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        First Time Setup
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FirstTimeSetup;