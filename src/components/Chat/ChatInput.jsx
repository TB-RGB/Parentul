import { useState } from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import muiCustomStyles from "../../styles/muiCustomStyles";


const ChatInput = ({ onSendMessage, isLoading, disabled }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage("");
        }
    };
    return (
        <>
   <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex' }}>
        <TextField
            type='text'
            placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={disabled ? 'w-full' : 'w-full'}
            sx={{ color: 'white', mr: 1, ...muiCustomStyles.textField}}
            disabled={disabled}
            
        />
        <Button sx={{mt: .5 , ...muiCustomStyles.button, borderRadius: '1em'}} disabled={disabled} type='submit' className={disabled ? 'btn btn-disabled ml-3': 'btn btn-outline ml-3'}>
            Ask
        </Button>
     </Box>
        </>
    )
}

export default ChatInput