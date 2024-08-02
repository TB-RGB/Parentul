import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import muiCustomStyles from '../../styles/muiCustomStyles';

const AddChildModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  
  const [children, setChildren] = useState([{ name: '', dob: '' }]);

  const handleAddChild = () => {
    setChildren([...children, { name: '', dob: '' }]);
  };

  const handleRemoveChild = (index) => {
    const newChildren = children.filter((_, i) => i !== index);
    setChildren(newChildren);
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = children.map((child, i) => 
      i === index ? { ...child, [field]: value } : child
    );
    setChildren(updatedChildren);
  };

  const handleSubmit = () => {
    const validChildren = children.filter(child => child.name && child.dob);
    if (validChildren.length > 0) {
      validChildren.forEach(child => {
        dispatch({
          type: 'ADD_CHILD',
          payload: {
            user_id: user.id,
            name: child.name,
            dob: child.dob
          }
        });
      });
      handleClose();
      setChildren([{ name: '', dob: '' }]);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      PaperProps={{
        style: {
          ...muiCustomStyles.card,
          maxWidth: '90%',
          width: '500px',
        }
      }}
    >
        <form onSubmit={handleSubmit}>
      <DialogTitle fontFamily={"Montserrat"}>Add New Children</DialogTitle>
      <DialogContent>
        {children.map((child, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Child's Name"
              value={child.name}
              onChange={(e) => handleChildChange(index, 'name', e.target.value)}
              sx={muiCustomStyles.textField}
            />
            <TextField
              fullWidth
              margin="normal"
              type="date"
              label="Date of Birth"
              value={child.dob}
              onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={muiCustomStyles.textField}
            />
            {index > 0 && (
              <IconButton onClick={() => handleRemoveChild(index)}>
                <DeleteIcon sx={{color: 'red'}}/>
              </IconButton>
            )}
          </Box>
        ))}
        <IconButton onClick={handleAddChild} color="primary">
          <AddIcon sx={{color: 'orange'}}/>
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{... muiCustomStyles.backButton, fontFamily: "Montserrat"}}>Cancel</Button>
        <Button type='submit' variant="contained" color="primary" sx={muiCustomStyles.button}>
          Add Children
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddChildModal;