/**
 * Middleware: checkMillionDollarIdea
 * Validates that an idea's projected yield (numWeeks × weeklyRevenue) meets
 * the million-dollar threshold before allowing creation or update.
 */
const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  const weeks = Number(numWeeks);
  const revenue = Number(weeklyRevenue);

  if (!numWeeks || !weeklyRevenue || isNaN(weeks) || isNaN(revenue) || weeks * revenue < 1000000) {
    return res.status(400).send();
  }

  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
