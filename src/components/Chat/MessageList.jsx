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
    if (typeof content === "object") {
      return content.text || content.content?.text || JSON.stringify(content);
    }
    return String(content);
  };

  return (
    <Paper elevation={3} sx={{ height: "400px", overflowY: "auto", pt: 2 }}>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={
                <div
                  className={
                    message.sender === "user"
                      ? "chat chat-end"
                      : "chat chat-start"
                  }
                >
                  <Typography
                    component="span"
                    variant="body2"
                    color={message.sender === "user" ? "white" : "black"}
                    className={
                      message.sender === "user"
                        ? "chat-bubble"
                        : "chat-bubble chat-bubble-accent"
                    }
                  >
                    {renderMessageContent(message.content)}
                  </Typography>
                  <div className="chat-footer">
                    {message.sender === "user" ? " You" : "Parentul"}
                  </div>
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
      <div ref={messagesEndRef} />
    </Paper>
  );
};

export default MessageList;
