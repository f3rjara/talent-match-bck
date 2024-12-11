const googleAIService = require("../services/google-ai.service");

const generateVacancy = async (req, res) => {
  try {
    const { prompt } = req.body; // Entrada del usuario
    const text = await googleAIService.generateResponse(prompt);
    res.json({ generatedText: text });
    console.log("result", res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateVacancy };
