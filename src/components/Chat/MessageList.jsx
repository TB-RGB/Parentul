import { useRef, useEffect } from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageContent = (content) => {
    if (content === null || content === undefined) {
      return "No message content";
    }
    if (typeof content === "object" && !Array.isArray(content)) {
      return content.text || content.content?.text || JSON.stringify(content);
    }
    return String(content);
  };

  const renderMessage = (message, index) => {
    const isUser = message.sender === "user";
    const messageContent = Array.isArray(message.content)
      ? message.content
      : [renderMessageContent(message.content)];

    return messageContent.map((content, contentIndex) => (
      <ListItem key={`${index}-${contentIndex}`} alignItems="flex-start">
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
                {renderMessageContent(content)}
              </Typography>
              <div className="chat-footer">{isUser ? " You" : "Parentul"}</div>
            </div>
          }
        />
      </ListItem>
    ));
  };

  return (
    <Paper elevation={3} sx={{ height: "400px", overflowY: "auto", pt: 2 }}>
      <List>
      {messages.flatMap((message, index) => renderMessage(message, index))}
      </List>
      <div ref={messagesEndRef} />
    </Paper>
  );
};

export default MessageList;
