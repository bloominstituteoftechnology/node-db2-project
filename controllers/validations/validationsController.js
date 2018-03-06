const id = (req, res, next) => {
  const { id } = req.params;

  if (!id || !Number.isInteger(+id)) {
    res
      .status(422)
      .json({ message: 'id must be a number.', err: `${id} is not a number.` });
    return;
  }

  next();
};

const zoo = (req, res, next) => {
  const zoo = req.body;

  if (!zoo.name || Number.isInteger(+zoo.name)) {
    res.status(422).json({
      error: 'Please provide a name for the zoo.',
      err: `${zoo.name} is not a string.`,
    });
    return;
  }

  next();
};

const bear = (req, res, next) => {
  const { zooId, species, latinName } = req.body;

  if (!zooId || !species || !latinName) {
    res.status(422).json({
      error: 'Please provide zooId, species, and latinName for the bear.',
    });
    return;
  }

  next();
};

module.exports = {
  id,
  zoo,
  bear,
};
