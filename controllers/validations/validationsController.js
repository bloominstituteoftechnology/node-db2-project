const id = (req, res, next) => {
  const { id } = req.params;

  if (!id || !Number.isInteger(+id)) {
    res
      .status(422)
      .json({ message: 'id must be a number.', err: `${id} is not a number.` });
    return;
  }

  req.id = id;
  next();
};

const zoo = (req, res, next) => {
  const { name } = req.body;

  if (!name || Number.isInteger(+name)) {
    res.status(422).json({
      error: 'Please provide a name for the zoo.',
      err: `${name} is not a string.`,
    });
    return;
  }

  req.name = name;
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

const check = {
  id,
  zoo,
  bear,
};

module.exports = check;
