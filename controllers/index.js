const knex = require("knex");
const dbConfig = require("../knexfile");

const db = knex(dbConfig.development);

exports.get = async (req, res) => {
  const data = await db.select().table(req.tableName);
  res.status(200).json({
    status: true,
    data: data
  });
};

exports.getId = async (req, res) => {
  const id = req.params.id;
  const data = await db(req.tableName)
    .where({
      id: id
    })
    .select();
  res.status(200).json({
    status: true,
    data: data
  });
};

exports.post = async (req, res) => {
  try {
    console.log(req.body);
    const id = await db(req.tableName).insert({
      name: req.body.name
    });

    res.status(200).json({
      status: true,
      id: id[0]
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "There was problem in inserting data into db"
    });
  }
};

exports.del = async (req, res) => {
  const id = req.params.id;
  const deletedID = await db(req.tableName)
    .where({
      id: id
    })
    .del();
  res.status(200).json({
    status: true,
    deletedID: deletedID
  });
};

exports.put = async (req, res) => {
  const id = req.params.id;
  const update = await db(req.tableName).update("name", req.body.name);
  res.status(200).json({
    status: true,
    update: update
  });
};
