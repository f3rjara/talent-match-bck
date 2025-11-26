const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config");
const aspirantRoutes = require("./routes/aspirant.routes");
const vacancyRoutes = require("./routes/vacancy.routes");
const googleAIRoutes = require("./routes/google-ai.routes");

const app = express();
connectDB();

const corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], 
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/api/aspirant", aspirantRoutes);
app.use("/api/vacancy", vacancyRoutes);

app.get("/", (req, res) => {
  res.send("API de WhatsApp Bot con Node.js y Express");
});

module.exports = app;