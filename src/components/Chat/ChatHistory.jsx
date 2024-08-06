import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Stack, Box, Card, Typography, Accordion, AccordionActions, AccordionSummary, AccordionDetails, Button, IconButton, Snackbar, Alert } from "@mui/material";
import Swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import DeleteIcon from "@mui/icons-material/Delete";
import muiCustomStyles from "../../styles/muiCustomStyles";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const ChatHistory = () => {
  const dispatch = useDispatch();
  const { conversations, feedbackError } = useSelector((store) => store.history);
  const history = useHistory();
  const { userId } = useParams();
  const family = useSelector((store) => store.familyReducer);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  useEffect(() => {
    if (feedbackError) {
      setSnackbarOpen(true);
    }
  }, [feedbackError]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    dispatch({ type: 'CLEAR_FEEDBACK_ERROR' });
  };

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      color: 'white',
      background: '#1A1A1A',
      showCancelButton: true,
      cancelButtonText: 'CANCEL',
      confirmButtonText: 'DELETE!',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
        popup: 'custom-popup',

      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "DELETE_CONVERSATION",
          payload: { conversationId: conversationId, userId: userId },
        });
      }
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <div ref={historyStartRef} />
      <Box sx={muiCustomStyles.box}>
        <Card sx={muiCustomStyles.card}>
          <Typography variant="h4" textAlign={"center"}>
            Chat History
          </Typography>
          <Button
            sx={muiCustomStyles.backButton}
            onClick={handleBackClick}
            startIcon={<FirstPageIcon />}
          >
            To Chat
          </Button>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            {conversations.map((conversation) => (
              <Accordion sx={muiCustomStyles.accordion} key={conversation.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%", // Ensure the Box takes full width
                    }}
                  >
                    <Typography>{formatDate(conversation.start_time)}</Typography>
                    {conversation.user_rating !== null && (
                      <Box> {/* Ensure consistent space for icon */}
                        {conversation.user_rating === true ? (
                          <ThumbUpAltIcon sx={{ color: "orange", mr: 1 }} />
                        ) : (
                          <ThumbDownAltIcon sx={{ color: "orange", mr: 1 }} />
                        )}
                      </Box>
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>
                      {!family.parent.firstName
                        ? "User"
                        : `${family.parent.firstName}'s`}{" "}
                      Message:
                    </strong>{" "}
                    {conversation.user_message}
                  </Typography>
                  <Typography>
                    <strong>Parentül's Response:</strong>{" "}
                    {conversation.ai_response}
                  </Typography>
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    sx={muiCustomStyles.backButton}
                    onClick={() => handleLogClick(conversation.id)}
                  >
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        sx={muiCustomStyles.snackbar}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={muiCustomStyles.snackbarAlert}>
          {feedbackError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChatHistory;
