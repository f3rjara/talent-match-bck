const express = require("express");
const router = express.Router();
const vacancyController = require("../controllers/vacancy.controller");

router.post("/", vacancyController.create);
router.get("/", vacancyController.getAll);
router.get("/:id", vacancyController.getById);
router.put("/:id", vacancyController.update);

module.exports = router;
