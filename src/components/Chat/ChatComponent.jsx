import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import {
  sendMessage,
  initializeChat,
  endConversation,
  clearMessages,
} from "../../redux/actions/chatActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./output.css";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { messages, isLoading, currentConversationId } = useSelector(
    (state) => state.chat
  );
  const user = useSelector((state) => state.user);
  const children = useSelector((store) => store.familyReducer.children);

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

  const handleHistoryClick = () => {
    history.push("/chathistory");
  };
  const handlePreferencesClick = () => {
    dispatch({ type: "FETCH_USER_PREFERENCES", payload: { userId: user.id } });
    history.push("/preferences");
  };

  function* chatScript() {
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `Hi there ${user.first_name}! What parenting question can I help you with?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "How do I handle my child's temper tantrums?",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `${user.first_name}, I'm sorry to hear that. Can you tell me more about the tantrums so I can best assist you?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: { sender: "ai", content: "Which child had the tantrum?" },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: { sender: "user", content: `${children[0].name}` },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `I see. And when did ${children[0].name} have a temper tantrum?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "It was a few days ago.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `That's helpful. And where did the temper tantrum occur?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "Inside of a Target store.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `I'm sorry about that, tantrums are an extreme display of unreasonable anger, frustration, or disappointment in response to an unmet need or desire. And how did ${children[0].name} express their frustration?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: `He screamed about not being able to get the toy he wanted.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `That situation must have been very stressful for you and ${children[0].name}. How long did this tantrum last?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "It lasted about 10 minutes.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `Must've felt like a long time. Where there any physical outbursts during the tantrum?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "They knocked over a toy display case.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `How did that make you feel?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "I felt really frustrated, embarrassed and angry.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `How did this tantrum episode end?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "I threatened them with a spanking and we left the store.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `Thank you for sharing, ${user.first_name}. Following here will be some recommendations for how to help your child. Ask any further questions if you need them.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: "First of all, setting clear and firm boundaries and expectations before going to the store can be helpful to preventing unrealistic expectations. Remember you are going to the store to buy something. It's easy for a child to assume you are going to buy something for them. If you are not intending to buy something for the child, you should have that discussion and agreement before leaving for the store.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "I'll definitely keep that in mind. Going forward, I'll make sure to set clear boundaries and expectations before leaving for the store.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `${user.first_name}, I look forward to hearing if this advice helps you. You can revisit this when we're done and give it a thumbs up or down, and I'll send a follow up message so we can touch base about it soon.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: "Let me know any time if there is any additional help I can provide to assit you with parenting.",
      },
    });
  }

  // script instance
  const simulateScript = chatScript();

  // function to run the script
  function simulate() {
    try {
      let next = simulateScript.next();
      if (!next.done) {
        setTimeout(simulate, 3500);
      }
    } catch (e) {
      console.log(e);
    }
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
        <button className="btn btn-secondary mt-5" onClick={handleHistoryClick}>
          View Chat History
        </button>
        <button
          className="btn btn-outline btn-xs"
          onClick={handlePreferencesClick}
        >
          View User Preferences
        </button>
        <Typography variant="h4" gutterBottom>
          Parentul Chat
        </Typography>

        <MessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </Box>
      <Button onClick={simulate}>Hide me</Button>
    </>
  );
};

export default ChatComponent;
