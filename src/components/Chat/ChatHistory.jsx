import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";

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

  return (
    <>
      <h1>Chat History</h1>
      <button className="btn btn-secondary mt-5" onClick={handleBackClick}>Back</button>
      {conversations.map((conversation) => (
        <div key={conversation.id}>
          <h2>{conversation.start_time}</h2>
          <p>{conversation.end_time}</p>
          <button className="btn btn-circle btn-outline" onClick={() => handleLogClick(conversation.id)}>
            View Log
          </button>
        </div>
      ))}
    </>
  );
};

export default ChatHistory;
