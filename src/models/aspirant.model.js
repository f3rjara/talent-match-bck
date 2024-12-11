const mongoose = require("mongoose");

const aspirantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Aspirant", aspirantSchema);