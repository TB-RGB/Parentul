import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  IconButton,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import muiCustomStyles from "../../styles/muiCustomStyles";

const ChatHistoryDetails = () => {
  const dispatch = useDispatch();
  const { log } = useSelector((store) => store.history);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const { chatId } = useParams();
  const messagesEndRef = useRef(null);
  const [userFeedback, setUserFeedback] = useState("");

  useEffect(() => {
    if (log.length === 0) {
      dispatch({ type: "FETCH_LOG", payload: { conversationId: chatId } });
    }
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [log]);

  const renderMessageContent = (content) => {
    if (content === null || content === undefined) {
      return "No message content";
    }
    if (typeof content === "object") {
      return content.text || content.content?.text || JSON.stringify(content);
    }
    return String(content);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackClick = () => {
    history.push(`/chathistory/${user.id}`);
  };

  const sendFeedback = () => {
    if (userFeedback === null || userFeedback === undefined) {
      alert("Please select a rating");
      return;
    }
    dispatch({
      type: "SEND_FEEDBACK",
      payload: { userId: user.id, conversationId: chatId, rating: userFeedback, questionText: `This is a question` },
    });
    handleBackClick();
  };

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
        <Card
          sx={{
            color: "white",
            backgroundColor: "#1E1E1E",
            borderRadius: "1em",
            my: 2,
            p: 4,
            boxShadow: "0px 0px 20px black",
            border: "2px outset orange",
          }}
        >
          <Typography variant="h4" textAlign={"center"}>
            Chat Log
          </Typography>
          <Button
            variant="outlined"
            sx={muiCustomStyles.backButton}
            onClick={handleBackClick}
            startIcon={<FirstPageIcon />}
          >
            To Chat History
          </Button>
          <Paper
            elevation={3}
            sx={{ height: "400px", overflowY: "auto", pt: 2 }}
          >
            <List>
              {log.map((message, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <div
                        className={
                          message.sender_type === "user"
                            ? "chat chat-end"
                            : "chat chat-start"
                        }
                      >
                        <Typography
                          component="span"
                          variant="body2"
                          color={
                            message.sender_type === "user" ? "white" : "black"
                          }
                          className={
                            message.sender_type === "user"
                              ? "chat-bubble"
                              : "chat-bubble chat-bubble-accent"
                          }
                        >
                          {renderMessageContent(message.content)}
                        </Typography>
                        <div className="chat-footer">
                          {message.sender_type === "user"
                            ? `${user.first_name}'s Question`
                            : "Parentul's Response"}
                        </div>
                      </div>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <div ref={messagesEndRef} />
          </Paper>
          <Typography variant="h6" textAlign={'center'} sx={{ marginTop: 2 }}>
              Was this helpful?
            </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton sx={{ mt: 2.3}} onClick={()=>setUserFeedback(false)}>
              {userFeedback === false ? <ThumbDownAltIcon sx={{ color: "orange", fontSize: 40 }} /> : <ThumbDownOffAltIcon sx={{ color: "orange", fontSize: 40 }} />}
            </IconButton>

            <IconButton onClick={() => setUserFeedback(true)}>
              {userFeedback === true ? <ThumbUpAltIcon sx={{ color: "orange", fontSize: 40 }} /> : <ThumbUpOffAltIcon sx={{ color: "orange", fontSize: 40 }} />}
            </IconButton>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
          <Button variant="outlined" sx={muiCustomStyles.backButton} endIcon={<LibraryAddIcon />} onClick={sendFeedback}>
                Save Feedback
            </Button>
           </Box> 
        </Card>
      </Box>
      {/* <h1>Chat Log</h1>
      <button onClick={handleBackClick}>Back</button>
      {log.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
          <p>{message.sender}</p>
        </div>
      ))} */}
    </>
  );
};

export default ChatHistoryDetails;
