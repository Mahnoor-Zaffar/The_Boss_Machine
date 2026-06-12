const express = require('express');
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

/**
 * Param middleware — resolve :ideaId once for all downstream handlers.
 * Validates the ID is numeric and exists in the database.
 */
ideasRouter.param('ideaId', (req, res, next, id) => {
  if (isNaN(Number(id))) {
    return res.status(404).send();
  }
  const idea = getFromDatabaseById('ideas', id);
  if (!idea) {
    return res.status(404).send();
  }
  req.idea = idea;
  next();
});

// GET /api/ideas — return all ideas
ideasRouter.get('/', (req, res) => {
  res.status(200).json(getAllFromDatabase('ideas'));
});

// GET /api/ideas/:ideaId — return a single idea
ideasRouter.get('/:ideaId', (req, res) => {
  res.status(200).json(req.idea);
});

// POST /api/ideas — create a new idea (must pass million-dollar check)
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
  const newIdea = req.body;
  newIdea.numWeeks = Number(newIdea.numWeeks);
  newIdea.weeklyRevenue = Number(newIdea.weeklyRevenue);
  const created = addToDatabase('ideas', newIdea);
  res.status(201).json(created);
});

// PUT /api/ideas/:ideaId — update an existing idea (must pass million-dollar check)
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
  const updatedData = { ...req.body, id: req.params.ideaId };
  updatedData.numWeeks = Number(updatedData.numWeeks);
  updatedData.weeklyRevenue = Number(updatedData.weeklyRevenue);
  const updated = updateInstanceInDatabase('ideas', updatedData);
  if (!updated) {
    return res.status(404).send();
  }
  res.status(200).json(updated);
});

// DELETE /api/ideas/:ideaId — remove an idea
ideasRouter.delete('/:ideaId', (req, res) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (!deleted) {
    return res.status(404).send();
  }
  res.status(204).send();
});

module.exports = ideasRouter;
