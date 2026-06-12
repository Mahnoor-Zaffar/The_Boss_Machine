const express = require('express');
const minionsRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

/**
 * Param middleware — resolve :minionId once for all downstream handlers.
 * Validates the ID is numeric and exists in the database.
 */
minionsRouter.param('minionId', (req, res, next, id) => {
  if (isNaN(Number(id))) {
    return res.status(404).send();
  }
  const minion = getFromDatabaseById('minions', id);
  if (!minion) {
    return res.status(404).send();
  }
  req.minion = minion;
  next();
});

// GET /api/minions — return all minions
minionsRouter.get('/', (req, res) => {
  res.status(200).json(getAllFromDatabase('minions'));
});

// GET /api/minions/:minionId — return a single minion
minionsRouter.get('/:minionId', (req, res) => {
  res.status(200).json(req.minion);
});

// POST /api/minions — create a new minion
minionsRouter.post('/', (req, res) => {
  const newMinion = req.body;
  newMinion.salary = Number(newMinion.salary);
  const created = addToDatabase('minions', newMinion);
  res.status(201).json(created);
});

// PUT /api/minions/:minionId — update an existing minion
minionsRouter.put('/:minionId', (req, res) => {
  const updatedData = { ...req.body, id: req.params.minionId };
  updatedData.salary = Number(updatedData.salary);
  const updated = updateInstanceInDatabase('minions', updatedData);
  if (!updated) {
    return res.status(404).send();
  }
  res.status(200).json(updated);
});

// DELETE /api/minions/:minionId — remove a minion
minionsRouter.delete('/:minionId', (req, res) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (!deleted) {
    return res.status(404).send();
  }
  res.status(204).send();
});

module.exports = minionsRouter;
