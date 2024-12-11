const express = require("express");
const router = express.Router();
const aspirantController = require("../controllers/aspirant.controller");

router.post("/", aspirantController.create);
router.get("/", aspirantController.getAll);
router.get("/:id", aspirantController.getById);
router.put("/:id", aspirantController.update);

module.exports = router;
