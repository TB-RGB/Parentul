import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { sendMessage, initializeChat } from "../../redux/actions/chatActions";

const ChatComponent = () => {
    const dispatch = useDispatch();
    const { messages, isLoading } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(initializeChat());
    }, [dispatch]);

    const handleSendMessage = (message) => {
        console.log("Sending message:", message);
        dispatch(sendMessage(message));
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Parentul Chat
            </Typography>
            <MessageList messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </Box>
    );
};

export default ChatComponent;