const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  experiencia: { type: String, required: true, unique: true },
  ubicacion: { type: String, required: true },
  disponibilidad: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Vacancy", vacancySchema);
