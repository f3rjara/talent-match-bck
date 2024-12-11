const Aspirant = require("../models/aspirant.model");

const create = async (aspirantData) => {
  const aspirant = new Aspirant(aspirantData);
  return await aspirant.save();
};

const getAll = async () => {
  return await Aspirant.find();
};

const getById = async (id) => {
  return await Aspirant.findById(id);
};

const update = async (id, aspirantData) => {
  return await Aspirant.findByIdAndUpdate(id, aspirantData, { new: true });
};

const deleteEntity = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteEntity,
};
