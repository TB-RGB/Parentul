import axios from "axios";

const api = {
  getAIResponse: async (message, userId) => {
    try {
      const response = await axios.post("/api/chat", {
        message: message,
        userId: userId,
      });
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      throw error;
    }
  },
  endConversation: async (conversationId) => {
    try {
      await axios.put("/api/chat/end", { conversationId });
    } catch (error) {
      console.error("Error ending conversation:", error);
    }
  },
};

export default api;
