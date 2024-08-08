import { io } from "socket.io-client";
import store from "../redux/store";
import { receiveWebSocketMessage } from "../redux/actions/chatActions";

let socket;

export const initializeWebSocket = () => {
  (socket = io(process.env.VITE_CLIENT_URL || "http://localhost:5001")),
    {
      transports: ["websocket", "polling"],
    };

  socket.on("connect", () => {});

  socket.on("connect_error", (error) => {
    console.log("Error connecting to WebSocket server:", error);
  });

  socket.on("message", (message) => {
    store.dispatch(
      receiveWebSocketMessage({
        sender: "ai",
        content: message.aiResponse,
        chatLogId: message.chatLogId,
      })
    );
  });

  return socket;
};

export const sendWebSocketMessage = (message, id) => {
  if (socket && socket.connected) {
    socket.emit("message", { text: message, userId: id });
  } else {
    console.error("WebSocket is not connected. Message not sent:", message);
  }
};
