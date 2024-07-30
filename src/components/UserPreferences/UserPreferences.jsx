import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Card, Typography, CircularProgress, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import muiCustomStyles from "../../styles/muiCustomStyles";

const UserPreferences = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const preferences = useSelector((store) => store.preferences.userPreferences[0]);
  const family = useSelector((store) => store.familyReducer);
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);

  const [notificationType, setNotificationType] = useState('');
  const [notifFreq, setNotifFreq] = useState('');

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
      setNotifFreq(preferences.notifications_freq || '');
    }
  }, [preferences]);

  const currentYear = new Date().getFullYear();
  const getBirthYear = (dateString) => new Date(dateString).getFullYear();

  const handleSubmit = () => {
    const updatedPreferences = {
      notifications_email: notificationType === 'email',
      notifications_sms: notificationType === 'sms',
      notifications_freq: notifFreq,
    };
    console.log('Updating preferences:', updatedPreferences);
    dispatch({ type: "UPDATE_USER_PREFERENCES", payload: { userId, preferences: updatedPreferences } });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!preferences) {
    return (
      <Box sx={{
        width: {
          xs: '100vw',  
          sm: '100vw',
          md: '60vw',
          lg: '50vw',    
        },
        margin: 'auto',
        padding: 2
      }}>
        <Card sx={muiCustomStyles.card}>
          <Typography sx={muiCustomStyles.medium}>No preferences found for this user.</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: {
        xs: '100vw',  // 100vw for extra-small screens and up
        sm: '70vw'    // 70vw for small screens and up
      },
      margin: 'auto',
      padding: 2
    }}>
      <Card sx={muiCustomStyles.card}>
        <Typography sx={muiCustomStyles.large}>User Preferences</Typography>

        <Typography sx={muiCustomStyles.medium}>{user.first_name} {user.last_name}</Typography>
        
        {family.children && family.children.length > 0 ? (
          family.children.map((child, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography>Child's Name: {child.name}</Typography>
              <Typography>Age: {currentYear - getBirthYear(child.dob)}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No children information available.</Typography>
        )}

        <Box sx={{ marginTop: 4 }}>
          <Typography sx={muiCustomStyles.medium}>Notifications</Typography>
          <FormControl fullWidth sx={{ mt: 2, ...muiCustomStyles.select }}>
            <InputLabel>Notification Type</InputLabel>
            <Select 
              value={notificationType} 
              onChange={(e) => setNotificationType(e.target.value)} 
              label="Notification Type"
              MenuProps={{ sx: muiCustomStyles.menu}}
            >
              <MenuItem value="email" sx={muiCustomStyles.menuItem}>Email</MenuItem>
              <MenuItem value="sms" sx={muiCustomStyles.menuItem}>SMS</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2, ...muiCustomStyles.select }}>
            <InputLabel>Notification Frequency</InputLabel>
            <Select 
              value={notifFreq} 
              onChange={(e) => setNotifFreq(e.target.value)} 
              label="Notification Frequency"
              MenuProps={{ sx: muiCustomStyles.menu}}
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
        </Box>
      </Card>
    </Box>
  );
};

export default UserPreferences;