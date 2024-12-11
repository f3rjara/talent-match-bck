const aspirantService = require("../services/aspirant.service");

const create = async (req, res) => {
  try {
    const aspirant = await aspirantService.create(req.body);
    res.status(201).json(aspirant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const aspirants = await aspirantService.getAll();
    res.json(aspirants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const aspirant = await aspirantService.getById(req.params.id);
    if (!aspirant) {
      return res.status(404).json({ message: "Aspirant not found" });
    }
    res.json(aspirant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const aspirant = await aspirantService.update(req.params.id, req.body);
    if (!aspirant) {
      return res.status(404).json({ message: "Aspirant not found" });
    }
    res.json(aspirant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update
};
