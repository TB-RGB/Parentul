const { AIChatEngine } = require("../aiChatEngine");
const { logChatHistory } = require("../models/chat.models");

const chatEngine = new AIChatEngine();

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", async (message) => {
      console.log("WebSocket message received:", message);
      try {
        const aiResponse = await chatEngine.generateResponse(message.text);
        console.log("AI Response:", aiResponse);

        //Log chat history
        await logChatHistory(message.userId, message.text, aiResponse);
        socket.emit("message", aiResponse);
      } catch (err) {
        console.error("Error handling chat message:", err);
        socket.emit("message", {
          text: "Sorry, I encountered an error. Please try again later.",
          category: "error",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

module.exports = { setupSocket };
