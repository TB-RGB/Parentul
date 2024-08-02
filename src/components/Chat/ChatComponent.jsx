import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { useEffect, useState, useRef } from "react";
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
  const [isSimulating, setIsSimulating] = useState(false);
  const user = useSelector((state) => state.user);
  const children = useSelector((store) => store.familyReducer.children);
  const timeoutRef = useRef(null);
  const simulateScript = useRef(chatScript()).current;

  useEffect(() => {
    dispatch(initializeChat());

    return () => {
      if (currentConversationId) {
        handleEndConversation();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dispatch, user.id]);

  useEffect(() => {
    if (isSimulating) {
      simulate();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isSimulating]);

  const handleSendMessage = (message) => {
    console.log("Sending message:", message);
    dispatch(sendMessage(message, user.id));
  };

  const handleEndConversation = () => {
    dispatch({ type: "CLEAR_MESSAGES" });
    history.push(`/chatlog/52`);
    setDisabled(false);
  };

  function* chatScript() {
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content:
          "I need some advice on dealing with my child's emotional outbursts.",
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `Absolutely ${user.first_name}, I understand you're asking about meltdowns. To help you better, could you tell me which child you're concerned about?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: { sender: "user", content: `${children[0].name}` },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `What specific meltdown behavior did ${children[0].name} exhibit?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: `Screaming about not being able to get the toy they wanted.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `I see. Has this happened before? If so, how often?`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "user",
        content: "It's started to increase recently.",
      },
    });
    yield setDisabled(true);
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `I'm sorry to hear that ${children[0].name} is experiencing meltdowns. Here's some advice to help manage these situations:`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `1. Identify triggers: Keep a journal to note what situations or events seem to precede meltdowns. This can help you anticipate and possibly prevent them.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `2. Create a calm-down space: Designate a quiet, comfortable area where ${children[0].name} can go to regulate emotions. Fill it with soothing items like soft toys, blankets, or calming pictures.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `3. Develop a calming routine: Work with ${children[0].name} to create a series of steps to follow when feeling overwhelmed. This might include deep breathing, counting, or using a stress ball.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `4. Use visual schedules: If transitions or unexpected changes trigger meltdowns, use picture schedules to help ${children[0].name} understand and prepare for daily activities.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `5. Validate feelings: During a meltdown, acknowledge ${children[0].name}'s feelings without judgment. Say something like, "I can see you're feeling very upset right now."`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `6. Maintain your calm: Your calm demeanor can help ${children[0].name} regulate their own emotions. Take deep breaths and speak in a soft, reassuring tone.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `7. Teach emotional vocabulary: Help ${children[0].name} name their feelings. This can make big emotions feel more manageable.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `8. Offer choices: When possible, give ${children[0].name} some control by offering limited choices. This can help prevent feelings of powerlessness that might trigger a meltdown.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `9. Praise calm behavior: When ${children[0].name} manages difficult emotions well, offer specific praise to reinforce this positive behavior.`,
      },
    });
    yield dispatch({
      type: "RECEIVE_MESSAGE",
      payload: {
        sender: "ai",
        content: `Remember, meltdowns are often a sign that a child is overwhelmed, not that they're misbehaving. With patience and consistent strategies, you can help ${children[0].name} develop better emotional regulation skills.`,
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
        content:
          "Let me know any time if there is any additional help I can provide to assit you with parenting.",
      },
    });
  }

  // script instance
  // const simulateChat = chatScript();

  // function to run the script
  function simulate() {
    if (!isSimulating) return;

    try {
      let next = simulateScript.next();
      if (!next.done) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(simulate, 3500);
      } else {
        setIsSimulating(false);
      }
    } catch (e) {
      console.log(e);
      setIsSimulating(false);
    }
  }

  function toggleSimulation() {
    setIsSimulating(prev => {
      if (prev && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return !prev;
    });
  }

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Box sx={muiCustomStyles.box}>
          <Card sx={muiCustomStyles.card}>
            <Typography variant="h4" gutterBottom fontFamily={"Montserrat"}>
              Parentul Chat
            </Typography>

            <MessageList
              messages={messages}
              visibleMessages={visibleMessages}
              setVisibleMessages={setVisibleMessages}
              setDisabled={setDisabled}
            />
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              disabled={disabled}
            />
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
        <div onClick={toggleSimulation}>
          {isSimulating ? "Pause Simulation" : "Start Simulation"}
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
