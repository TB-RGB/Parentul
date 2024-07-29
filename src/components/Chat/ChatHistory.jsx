import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import {
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ChatHistory = () => {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.history);
  const history = useHistory();

  const { userId } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_CONVERSATIONS", payload: { userId: userId } });
  }, [dispatch]);

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
            Chat History
          </Typography>
          <button onClick={handleBackClick}>Back</button>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            {conversations.map((conversation) => (
              <Accordion
                sx={{
                  backgroundColor: "#1E1E1E",
                  border: "2px outset orange",
                  boxShadow: "0px 0px 20px black",
                  borderRadius: "1em",
                  color: "white",
                }}
                key={conversation.id}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                  {formatDate(conversation.start_time)}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>User:</strong> {conversation.user_message}</Typography>
                  <Typography><strong>AI:</strong> {conversation.ai_response}</Typography>
                </AccordionDetails>
                <AccordionActions>
                  <button onClick={() => handleLogClick(conversation.id)}>
                    View Log
                  </button>
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
