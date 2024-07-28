import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import {
  sendMessage,
  initializeChat,
  endConversation,
  clearMessages,
} from "../../redux/actions/chatActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './output.css';

const ChatComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { messages, isLoading, currentConversationId } = useSelector(
    (state) => state.chat
  );
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeChat());
    dispatch({ type: 'FETCH_FAMILY', payload: user.id });
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

 const handleHistoryClick = () => {
   history.push('/chathistory');
 }
  const handlePreferencesClick = () => {
    dispatch({ type: 'FETCH_USER_PREFERENCES', payload:{userId: user.id} });
   history.push('/preferences');
 }

  return (
    <>
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
        <p className="text-center">
          <button
            className="btn btn-primary mb-5"
            onClick={handleEndConversation}
          >
            End Conversation
          </button>
        </p>
        <button className="btn btn-secondary mt-5" onClick={handleHistoryClick}>View Chat History</button>
        <button className="btn btn-outline btn-xs" onClick={handlePreferencesClick}>View User Preferences</button>
        <Typography variant="h4" gutterBottom>
          Parentul Chat
        </Typography>

        <MessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </Box>
    </>
  );
};

export default ChatComponent;
