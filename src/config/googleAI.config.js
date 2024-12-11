const { GoogleGenerativeAI } = require("@google/generative-ai");

const googleAI = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY, // Tu clave API de Google Generative AI
});

module.exports = googleAI;
