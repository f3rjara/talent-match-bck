const Vacancy = require("../models/vacancy.model");
const aspirantService = require("./aspirant.service");
const googleAIService = require("./google-ai.service");

const create = async (vacancyData) => {
  const vacancy = new Vacancy(vacancyData);
  return await vacancy.save();
};

const getAll = async () => {
  return await Vacancy.find();
};

const getById = async (id) => {
  return await Vacancy.findById(id);
};

const getByProperty = async (property, value) => {
  const query = {};
  query[property] = value;
  return await Vacancy.findOne(query);
};

const getByIdWithAspirants = async (id) => {
  try {
    let vacancy = await getByProperty('id', Number(id));
    let aspirants = await aspirantService.getByProperty('vacancy', vacancy.id);

    for (const aspirant of aspirants) {
      try {
        const weightedTechnicalSkillsRes = await googleAIService.calculateWeighted(
          "weightedTechnicalSkills", aspirant, vacancy
        );
        const weightedBehavioralCompetenciesRes = await googleAIService.calculateWeighted(
          "weightedBehavioralCompetencies", aspirant, vacancy
        );
        const weightedCognitiveSkillsRes = await googleAIService.calculateWeighted(
          "weightedCognitiveSkills", aspirant, vacancy
        );
        aspirant.weightedTechnicalSkills = weightedTechnicalSkillsRes.concept;
        aspirant.weightedTechnicalSkillsRetro = weightedTechnicalSkillsRes.naturalResponse;
        aspirant.weightedBehavioralCompetencies = weightedBehavioralCompetenciesRes.concept;
        aspirant.weightedBehavioralCompetenciesRetro = weightedBehavioralCompetenciesRes.naturalResponse;
        aspirant.weightedCognitiveSkills = weightedCognitiveSkillsRes.concept;
        aspirant.weightedCognitiveSkillsRetro = weightedCognitiveSkillsRes.naturalResponse;
        console.log("aspirant >>>>>>>>< ", aspirant);
      } catch (error) {
        console.error(`Error procesando aspirante ${aspirant.id}:`, error);
        aspirant.processingError = true; // Marcar si hubo error en el aspirante
      }
    }

    return { vacancy, aspirants };
  } catch (error) {
    console.error("Error general:", error);
    throw new Error("No se pudo obtener la vacante y aspirantes.");
  }
};


const update = async (id, vacancyData) => {
  return await Vacancy.findByIdAndUpdate(id, vacancyData, { new: true });
};

const deleteEntity = async (id) => {
  return await Vacancy.findByIdAndDelete(id);
};

module.exports = {
  create,
  getAll,
  getById,
  getByIdWithAspirants,
  getByProperty,
  update,
  deleteEntity,
};
