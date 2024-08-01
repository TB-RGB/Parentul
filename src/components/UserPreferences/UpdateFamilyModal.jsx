import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import muiCustomStyles from '../../styles/muiCustomStyles';

const UpdateFamilyModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const family = useSelector((store) => store.familyReducer);

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        if (family.children) {
            setChildren(family.children.map(child => ({
                ...child,
                dob: formatDate(child.dob)
            })));
        }
    }, [family.children]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date)
            ? date.toISOString().split('T')[0]
            : '';
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        dispatch({
            type: 'UPDATE_FAMILY',
            payload: {
                firstName,
                lastName,
                children
            }
        });
        handleClose();
    };

    const handleChildChange = (index, field, value) => {
        const updatedChildren = [...children];
        updatedChildren[index] = { ...updatedChildren[index], [field]: value };
        setChildren(updatedChildren);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    ...muiCustomStyles.card,
                    maxWidth: '100%',
                    width: '500px',
                }
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>Update Family Information</DialogTitle>
                <DialogContent>
                    <Card sx={muiCustomStyles.childcard}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={muiCustomStyles.textFieldTopEdit}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            sx={muiCustomStyles.textFieldBottomEdit}
                        />
                    </Card>
                    {children.map((child, index) => (
                        <Box sx={{ marginTop: 1 }} key={child.id || index}>
                            <Card sx={muiCustomStyles.childcard}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label={`Child ${index + 1} Name`}
                                    value={child.name || ''}
                                    onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                                    sx={muiCustomStyles.textFieldTopEdit}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    type="date"
                                    label="Date of Birth"
                                    value={child.dob || ''}
                                    onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    sx={muiCustomStyles.textFieldBottomEdit}
                                />
                            </Card>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={muiCustomStyles.backButton}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" sx={muiCustomStyles.button}>
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateFamilyModal;