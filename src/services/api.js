import axios from "axios";

const api = {
  getAIResponse: async (message, userId) => {
    try {
      const response = await axios.post("/api/chat", { message: message, userId: userId });
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      throw error;
    }
  },
};

export default api;
