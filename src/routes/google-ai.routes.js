const express = require("express");
const router = express.Router();
const googleAIController = require("../controllers/google-ai.controller");

router.post("/generate-vacancy", googleAIController.generateVacancy);

module.exports = router;
