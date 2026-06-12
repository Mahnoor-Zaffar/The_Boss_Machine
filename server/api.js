const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');
const workRouter = require('./work');

// Mount domain routers
apiRouter.use('/minions/:minionId/work', (req, res, next) => {
  // Validate :minionId before delegating to the work sub-router
  const { getFromDatabaseById } = require('./db');
  const minionId = req.params.minionId;
  if (isNaN(Number(minionId))) {
    return res.status(404).send();
  }
  const minion = getFromDatabaseById('minions', minionId);
  if (!minion) {
    return res.status(404).send();
  }
  next();
}, workRouter);

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
