const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config");
const aspirantRoutes = require("./routes/aspirant.routes");
const googleAIRoutes = require("./routes/googleAI.routes");

const app = express();
connectDB();

app.use(bodyParser.json());
app.use("/api/aspirant", aspirantRoutes);

module.exports = app;
