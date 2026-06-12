const express = require('express');
// mergeParams: true allows access to :minionId from the parent router
const workRouter = express.Router({ mergeParams: true });

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

/**
 * Param middleware — resolve :workId once for all downstream handlers.
 * Validates the ID is numeric and exists in the database.
 */
workRouter.param('workId', (req, res, next, id) => {
  if (isNaN(Number(id))) {
    return res.status(404).send();
  }
  const work = getFromDatabaseById('work', id);
  if (!work) {
    return res.status(404).send();
  }
  req.work = work;
  next();
});

// GET /api/minions/:minionId/work — return all work for this minion
workRouter.get('/', (req, res) => {
  const allWork = getAllFromDatabase('work');
  const minionWork = allWork.filter(w => w.minionId === req.params.minionId);
  res.status(200).json(minionWork);
});

// POST /api/minions/:minionId/work — create a new work item for this minion
workRouter.post('/', (req, res) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId;
  newWork.hours = Number(newWork.hours);
  const created = addToDatabase('work', newWork);
  res.status(201).json(created);
});

// PUT /api/minions/:minionId/work/:workId — update a work item
workRouter.put('/:workId', (req, res) => {
  const updatedData = { ...req.body, id: req.params.workId };
  updatedData.hours = Number(updatedData.hours);
  // Enforce minionId consistency: the work item must belong to this minion
  if (String(updatedData.minionId) !== req.params.minionId) {
    return res.status(400).send();
  }
  const updated = updateInstanceInDatabase('work', updatedData);
  if (!updated) {
    return res.status(404).send();
  }
  res.status(200).json(updated);
});

// DELETE /api/minions/:minionId/work/:workId — remove a work item
workRouter.delete('/:workId', (req, res) => {
  const deleted = deleteFromDatabasebyId('work', req.params.workId);
  if (!deleted) {
    return res.status(404).send();
  }
  res.status(204).send();
});

module.exports = workRouter;
