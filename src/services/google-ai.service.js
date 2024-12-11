const googleAI = require("../config/google-ai.config");

const generateResponse = async (prompt) => {
  try {
    const response = await googleAI.generateText({
      model: "text-bison-001", // Modelo pre-entrenado de Google
      prompt,
    });
    return response.data.candidates[0].output; // Texto generado
  } catch (error) {
    console.error("Error generating response from Google Generative AI:", error);
    throw new Error("Failed to generate text");
  }
};

module.exports = { generateResponse };
