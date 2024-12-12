const mongoose = require("mongoose");

const aspirantSchema = new mongoose.Schema({
  phoneIdentificator: { type: String },
  contactInformation: {
    name: { type: String },
    lastname: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    documentNumber: { type: String },
  },
  professionalSummary: { type: String },
  workExperience: [
    {
      jobTitle: { type: String },
      companyName: { type: String },
      employmentDates: { type: String },
      responsibilitiesAndAchievements: { type: String }
    }
  ],
  education: [
    {
      degreeObtained: { type: String },
      institutionName: { type: String },
      graduationDate: { type: String },
      status: { type: String }
    }
  ],
  technicalSkills: { type: [String] },
  softSkills: { type: [String] },
  languages: { type: [String] }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Aspirant", aspirantSchema);
