import { useRef, useEffect } from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const MessageList = ({ messages, visibleMessages, setVisibleMessages, setDisabled }) => {
  const messagesEndRef = useRef(null);
  
 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // ! This is a bit of a hack, but it works for now
    console.log("Messages updated:", messages);
    if (messages.length > visibleMessages.length - 1) { // Subtract 1 to account for the initial greeting from chat
      const newMessages = messages.slice(visibleMessages.length - 1);
      console.log("New messages:", newMessages);

      newMessages.forEach((newMessage, index) => {
        if (newMessage.sender === "ai" && Array.isArray(newMessage.content)) {
          console.log("AI message with array content detected");
          newMessage.content.forEach((advice, adviceIndex) => {
            if (advice !== null) { // Skip null content, if any, shouldn't be but..
              setTimeout(() => {
                console.log(`Adding advice ${adviceIndex + 1} of ${newMessage.content.length}`);
                setVisibleMessages(prevMessages => [
                  ...prevMessages,
                  { ...newMessage, content: advice }
                ]);
              }, (index * newMessage.content.length + adviceIndex) * 3500); // Delay each advice by 5s, staggering start times
            setDisabled(true);
            }
          });
        } else {
          console.log("Adding non-array message");
          setVisibleMessages(prevMessages => [...prevMessages, newMessage]);
        }
      });
    }
  }, [messages]);

  useEffect(() => {
    console.log("Visible messages updated:", visibleMessages);
    scrollToBottom();
  }, [visibleMessages]);

  const renderMessageContent = (content) => {
    if (content === null || content === undefined) {
      return "No message content";
    }
    if (typeof content === "object" && !Array.isArray(content)) {
      return content.text || content.content?.text || JSON.stringify(content);
    }
    return String(content);
  };


  // ? To handle message arrays (e.g. for AI advice), we need to render each item in the array separately
  const renderMessage = (message, index) => {
    const isUser = message.sender === "user";
    return (
      <ListItem key={index} alignItems="flex-start">
        <ListItemText
          primary={
            <div className={isUser ? "chat chat-end" : "chat chat-start"}>
              <Typography
                component="span"
                variant="body2"
                color={isUser ? "white" : "black"}
                className={
                  isUser ? "chat-bubble" : "chat-bubble chat-bubble-accent"
                }
              >
                {renderMessageContent(message.content)}
              </Typography>
              <div className="chat-footer">{isUser ? " You" : "Parentul"}</div>
            </div>
          }
        />
      </ListItem>
    );
  };

  return (
    <Paper elevation={3} sx={{ height: "400px", overflowY: "auto", pt: 2}}>
      <List>
        {visibleMessages.map((message, index) => renderMessage(message, index))}
      </List>
      <div ref={messagesEndRef} />
    </Paper>
  );
};

export default MessageList;