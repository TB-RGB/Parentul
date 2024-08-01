import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Card, Typography } from "@mui/material";
import {
  sendMessage,
  initializeChat,
  endConversation,
  clearMessages,
} from "../../redux/actions/chatActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import muiCustomStyles from "../../styles/muiCustomStyles";
import "./output.css";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { messages, isLoading, currentConversationId } = useSelector(
    (state) => state.chat
  );
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeChat());

    return () => {
      if (currentConversationId) {
        dispatch(endConversation(currentConversationId));
        dispatch(clearMessages());
      }
    };
  }, [dispatch, user.id]);

  const handleSendMessage = (message) => {
    console.log("Sending message:", message);
    dispatch(sendMessage(message, user.id));
  };

  const handleEndConversation = () => {
    if (currentConversationId) {
      dispatch(endConversation(currentConversationId));
      dispatch(clearMessages());
    }
  };


  return (
    <>
      <Box sx={muiCustomStyles.box}>
<Card sx={muiCustomStyles.card}>
        
        
        <Typography variant="h4" gutterBottom>
          Parentul Chat
        </Typography>

        <MessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <Box sx={muiCustomStyles.buttonbox}>
      
      <Button
            sx={{mt: 4, ...muiCustomStyles.button}}
            onClick={handleEndConversation}
          >
            End Conversation
          </Button>
          
          </Box>
        
        </Card>
      </Box>
     
    </>
  );
};

export default ChatComponent;
