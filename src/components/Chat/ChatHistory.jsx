import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Stack,
  Box,
  Card,
  Typography,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import DeleteIcon from '@mui/icons-material/Delete';
import muiCustomStyles from "../../styles/muiCustomStyles";


const ChatHistory = () => {
  const dispatch = useDispatch();
  const { conversations } = useSelector((store) => store.history);
  const history = useHistory();
  const { userId } = useParams();
  const family = useSelector((store) => store.familyReducer);

  const historyStartRef = useRef(null);

  const scrollTop = () => {
   historyStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { 
    scrollTop();
  }, [conversations]);

  useEffect(() => {
    dispatch({ type: "FETCH_CONVERSATIONS", payload: { userId: userId } });
  }, [dispatch, userId]);

  const handleLogClick = (conversationId) => {
    history.push(`/chatlog/${conversationId}`);
    dispatch({
      type: "FETCH_LOG",
      payload: { conversationId: conversationId },
    });
  };

  const handleBackClick = () => {
    history.push("/chat");
  };

  const handleDeleteClick = (conversationId) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      dispatch({
        type: "DELETE_CONVERSATION",
        payload: { conversationId: conversationId, userId: userId },
      });
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <>
    <div ref={historyStartRef}/>
    <Box sx={muiCustomStyles.box}>
      <Card sx={muiCustomStyles.card}>
        <Typography variant="h4" textAlign={"center"}>
          Chat History
        </Typography>
        <Button sx={muiCustomStyles.backButton} onClick={handleBackClick} startIcon={<FirstPageIcon />}>
          To Chat
        </Button>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          {conversations.map((conversation) => (
            <Accordion
              sx={muiCustomStyles.accordion}
              key={conversation.id}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                {formatDate(conversation.start_time)} {conversation.user_rating != null ? ` - Was this helpful? ${conversation.user_rating}` : ""}
              </AccordionSummary>
              <AccordionDetails>
                <Typography><strong>{!family.parent.firstName ? "User": `${family.parent.firstName}'s`} Message:</strong> {conversation.user_message}</Typography>
                <Typography><strong>Parentul's Response:</strong> {conversation.ai_response}</Typography>
              </AccordionDetails>
              <AccordionActions>
                <Button 
                sx={muiCustomStyles.backButton}
                onClick={() => handleLogClick(conversation.id)}>
                  View Log
                </Button>
                
                <IconButton 
                sx={muiCustomStyles.deleteButton}
                  onClick={() => handleDeleteClick(conversation.id)}
                  aria-label="delete"
                  color="error"
                >
                  
                  <DeleteIcon />
                </IconButton>
                
              </AccordionActions>
            </Accordion>
          ))}
        </Stack>
      </Card>
    </Box>
    </>
  );
};

export default ChatHistory;