const vacancyService = require("../services/vacancy.service");

const create = async (req, res) => {
  try {
    const vacancy = await vacancyService.create(req.body);
    res.status(201).json(vacancy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const vacancies = await vacancyService.getAll();
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const vacancy = await vacancyService.getById(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: "vacancy not found" });
    }
    res.json(vacancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const vacancy = await vacancyService.update(req.params.id, req.body);
    if (!vacancy) {
      return res.status(404).json({ message: "vacancy not found" });
    }
    res.json(vacancy);
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
