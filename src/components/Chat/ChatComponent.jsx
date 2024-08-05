import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { useEffect, useState } from "react";
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
  const [visibleMessages, setVisibleMessages] = useState([
    {
      sender: "ai",
      content:
        "Hello, welcome to Parentul! Please, tell me what problem you'd like some advice on.",
    },
  ]);
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeChat());

    return () => {
      if (currentConversationId) {
        handleEndConversation();
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
      setVisibleMessages([
        {
          sender: "ai",
          content:
            "Hello, welcome to Parentul! Please, tell me what problem you'd like some advice on.",
        },
      ]);
    }
    setDisabled(false);
    history.push(`/chatlog/${currentConversationId}`);
  };

  return (
    <>
    <div style={{ overflow: "hidden" }}>
      <Box sx={muiCustomStyles.box}>
        <Card sx={muiCustomStyles.card}>
          

          <MessageList
            messages={messages}
            visibleMessages={visibleMessages}
            setVisibleMessages={setVisibleMessages}
            setDisabled={setDisabled}
          />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} disabled={disabled} />
          <Box sx={muiCustomStyles.buttonbox}>
            <Button
              sx={{ mt: 4, ...muiCustomStyles.button }}
              onClick={handleEndConversation}
            >
              End Conversation
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
    </>
  );
};

export default ChatComponent;
