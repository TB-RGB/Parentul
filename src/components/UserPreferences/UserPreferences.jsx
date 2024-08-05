import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Box, Card, Typography, CircularProgress, Grid, Select, MenuItem, FormControl, InputLabel, Button, TextField, IconButton, Snackbar } from "@mui/material";
import Swal from "sweetalert2";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import muiCustomStyles from "../../styles/muiCustomStyles";
import UpdateFamilyModal from "./UpdateFamilyModal";
import AddChildModal from "./AddChildModal";

const UserPreferences = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const preferences = useSelector((store) => store.preferences.userPreferences[0]);
  const family = useSelector((store) => store.familyReducer);
  const user = useSelector((store) => store.user);
  const jobStatus = useSelector(store => store.jobStatusReducer)
  const [isLoading, setIsLoading] = useState(true);

  const [notificationType, setNotificationType] = useState('');
  const [notificationFreq, setNotificationFreq] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [addChildModalOpen, setAddChildModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!preferences) {
        await dispatch({ type: "FETCH_USER_PREFERENCES", payload: { userId: userId } });
      }
      await dispatch({ type: "FETCH_FAMILY", payload: userId });
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, userId, preferences]);

  useEffect(() => {
    if (preferences) {
      setNotificationType(preferences.notifications_email ? 'email' : 'sms');
      setNotificationFreq(preferences.notifications_freq || '');
      setPhoneNumber(preferences.phone_number || '');
    }
  }, [preferences]);

  useEffect(() => {
    if (jobStatus) {
      console.log('Job Status:', jobStatus);
      setSnackbarMessage(`Job Status: ${JSON.stringify(jobStatus)}`);
      setSnackbarOpen(true);
    }
  }, [jobStatus]);

  const currentYear = new Date().getFullYear();
  const getBirthYear = (dateString) => new Date(dateString).getFullYear();

  const handleSubmit = () => {
    const updatedPreferences = {
      notifications_email: notificationType === 'email',
      notifications_sms: notificationType === 'sms',
      notifications_freq: notificationFreq,
      phone_number: phoneNumber
    };
    console.log('Updating preferences:', updatedPreferences);
    dispatch({ type: "UPDATE_USER_PREFERENCES", payload: { userId, preferences: updatedPreferences } });
    const notificationMethod = notificationType === 'email' ? 'Email' : 'SMS';
    const frequencyText = notificationFreq === '24' ? 'Daily' : notificationFreq === '48' ? '48 hours' : 'None';
    const message = `Preferences updated: 
    Notification Method: ${notificationMethod}
    Frequency: ${frequencyText}
    ${notificationType === 'sms' ? `Phone Number: ${phoneNumber}` : ''}`;

    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDeleteChild = (childId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
            color: 'white',
            background: '#1A1A1A',
            showCancelButton: true,
            cancelButtonText: 'CANCEL',
            confirmButtonText: 'DELETE!',

            customClass: {
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button',

                popup: 'custom-popup',

            }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'DELETE_CHILD', payload: { childId } });
        Swal.fire({
          
          text: `Deleted`,
          icon: 'success',
          color: 'white',
          background: '#1A1A1A',

          customClass: {
              confirmButton: 'custom-confirm-button',
              popup: 'custom-popup'

          }

      })
      }
    });
  };

  const handleCheckJobStatus = () => {
    dispatch({ type: 'CHECK_JOB_STATUS' });
  };

  
  if (isLoading) {
    return (
      <Box sx={muiCustomStyles.box}>
        <CircularProgress />
      </Box>
    );
  }

  if (!preferences) {
    return (
      <Box sx={muiCustomStyles.box}>
        <Card sx={muiCustomStyles.card}>
          <Typography sx={muiCustomStyles.medium}>No preferences found for this user.</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={muiCustomStyles.box}>
      <Card sx={muiCustomStyles.card}>

        <Typography sx={muiCustomStyles.header}>User Preferences</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setUpdateModalOpen(true)}
            sx={{ mt: 2, ...muiCustomStyles.backButton }}
          >
            Update Family Information
          </Button>
        </Box>
        <Typography sx={muiCustomStyles.large}>{user.first_name} {user.last_name}</Typography>


        <Grid container justifyContent="center" spacing={2}>
          {family.children && family.children.length > 0 ? (
            family.children.map((child, index) => (
              <Grid item {...muiCustomStyles.childGridItem} key={index}>
                <Box sx={{ marginBottom: 0, position: 'relative' }}>
                  <Card sx={muiCustomStyles.childcard}>
                    <Typography sx={muiCustomStyles.small}>{child.name}</Typography>
                    <Typography sx={muiCustomStyles.small}>Age: {currentYear - getBirthYear(child.dob)}</Typography>
                    {family.children.length > 1 && (
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteChild(child.id)}
                        sx={{ position: 'absolute', top: -21, right: -21 }}
                        color="error"
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                  </Card>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography>No children information available.</Typography>
          )}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button

            onClick={() => setAddChildModalOpen(true)}
            sx={{ mt: 2, ...muiCustomStyles.backButton }}
          >
            Add Child
          </Button>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Typography sx={muiCustomStyles.medium}>Notifications</Typography>
          <FormControl fullWidth sx={{ mt: 2, ...muiCustomStyles.select }}>
            <InputLabel>Notification Type</InputLabel>
            <Select
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value)}
              label="Notification Type"
              MenuProps={{ sx: muiCustomStyles.menu }}
            >
              <MenuItem value="email" sx={muiCustomStyles.menuItem}>Email</MenuItem>
              <MenuItem value="sms" sx={muiCustomStyles.menuItem}>SMS</MenuItem>
            </Select>
          </FormControl>
          {notificationType === 'sms' && (
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ mt: 2, ...muiCustomStyles.textField }}
            />
          )}
          <FormControl fullWidth sx={{ mt: 2, ...muiCustomStyles.select }}>
            <InputLabel>Notification Frequency</InputLabel>
            <Select
              value={notificationFreq}
              onChange={(e) => setNotificationFreq(e.target.value)}
              label="Notification Frequency"
              MenuProps={{ sx: muiCustomStyles.menu }}
            >
              <MenuItem value="24" sx={muiCustomStyles.menuItem}>Daily</MenuItem>
              <MenuItem value="48" sx={muiCustomStyles.menuItem}>48 hrs</MenuItem>
              <MenuItem value="none" sx={muiCustomStyles.menuItem}>None</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2, ...muiCustomStyles.button }}
          >
            Update Preferences
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {/* <Button
            variant="contained"
            onClick={handleCheckJobStatus}
            sx={{ mt: 2, ...muiCustomStyles.button }}
          >
            Check Job Status
          </Button> */}
        </Box>
        </Box>
      </Card>

      <UpdateFamilyModal
        open={updateModalOpen}
        handleClose={() => setUpdateModalOpen(false)}
      />

      <AddChildModal
        open={addChildModalOpen}
        handleClose={() => setAddChildModalOpen(false)}
      />
      <Snackbar
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
  open={snackbarOpen}
  autoHideDuration={2500}
  onClose={handleSnackbarClose}
>
  <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
    <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
      {snackbarMessage}
    </Typography>
  </Alert>
</Snackbar>
    </Box>
  );
};

export default UserPreferences;