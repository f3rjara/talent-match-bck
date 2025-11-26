const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const vacancySchema = new mongoose.Schema({
  id: { type: Number, unique: true, },
  titulo: { type: String, required: true },
  experiencia: { type: String, required: true },
  ubicacion: { type: String, required: true },
  disponibilidad: { type: String, required: true },
}, {
  timestamps: true,
});

vacancySchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Vacancy", vacancySchema);
