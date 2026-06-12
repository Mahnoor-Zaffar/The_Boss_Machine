const express = require('express');
const meetingsRouter = express.Router();

const {
  getAllFromDatabase,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require('./db');

// GET /api/meetings — return all meetings
meetingsRouter.get('/', (req, res) => {
  res.status(200).json(getAllFromDatabase('meetings'));
});

// POST /api/meetings — create a new meeting (payload generated internally)
meetingsRouter.post('/', (req, res) => {
  const newMeeting = createMeeting();
  const created = addToDatabase('meetings', newMeeting);
  res.status(201).json(created);
});

// DELETE /api/meetings — delete all meetings
meetingsRouter.delete('/', (req, res) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter;
