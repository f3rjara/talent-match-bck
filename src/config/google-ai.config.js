const { GoogleGenerativeAI } = require("@google/generative-ai");

const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

module.exports = googleAI;
