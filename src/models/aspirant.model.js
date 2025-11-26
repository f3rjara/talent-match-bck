const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const aspirantSchema = new mongoose.Schema({
  aspirantId: { type: Number, unique: true, },
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
  languages: { type: [String] },
  vacancy: { type: Number },
  weightedTechnicalSkills: { type: String },
  weightedTechnicalSkillsRetro: { type: String },
  weightedBehavioralCompetencies: { type: String },
  weightedBehavioralCompetenciesRetro: { type: String },
  weightedCognitiveSkills: { type: String },
  weightedCognitiveSkillsRetro: { type: String },
  }, {
    timestamps: true,
  }
);

aspirantSchema.plugin(AutoIncrement, { inc_field: "aspirantId" });

module.exports = mongoose.model("Aspirant", aspirantSchema);
