import { useState } from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";


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
   <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', fontFamily: "Montserrat" }}>
        <input 
            type='text'
            placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={disabled ? 'input input-disabled w-full' : 'input input-bordered input-accent w-full'}
            sx={{ mr: 1}}
            disabled={disabled}
            
        />
        <button  disabled={disabled} type='submit' className={disabled ? 'btn btn-disabled ml-3': 'btn btn-outline ml-3'}>
            Ask
        </button>
     </Box>
        </>
    )
}

export default ChatInput