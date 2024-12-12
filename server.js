require("dotenv").config();
const app = require("./src/app");
const { startBot } = require("./src/bot/index");

const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000; // Puerto para Express
const BOT_PORT = process.env.BOT_PORT || 3001; // Puerto para el Bot

// Iniciar servidor de Express
app.listen(EXPRESS_PORT, () => {
  console.log(`API corriendo en http://localhost:${EXPRESS_PORT}`);
});

// Iniciar el Bot en otro puerto
startBot(BOT_PORT);
