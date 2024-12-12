const Vacancy = require("../models/vacancy.model");

const create = async (vacancyData) => {
  const vacancy = new Vacancy(vacancyData);
  return await Vacancy.save();
};

const getAll = async () => {
  return await Vacancy.find();
};

const getById = async (id) => {
  return await Vacancy.findById(id);
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
  update,
  deleteEntity,
};
