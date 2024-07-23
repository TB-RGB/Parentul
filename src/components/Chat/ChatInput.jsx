import { useState } from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";


const ChatInput = ({ onSendMessage, isLoading }) => {
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
        <input 
            type='text'
            placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='input input-bordered input-accent w-full'
            sx={{ mr: 1}}
        />
        <button type='submit' className='btn btn-outline ml-3'>
            Ask
        </button>
     </Box>
        </>
    )
}

export default ChatInput