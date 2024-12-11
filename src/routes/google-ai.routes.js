const express = require("express");
const router = express.Router();
const googleAIController = require("../controllers/googleAI.controller");

router.post("/generate-vacancy", googleAIController.generateVacancy);

module.exports = router;
