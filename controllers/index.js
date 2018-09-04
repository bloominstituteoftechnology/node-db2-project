const knex = require("knex");
const dbConfig = require("../knexfile");

const db = knex(dbConfig.development);

exports.get = async (tableName, req, res) => {
    const bearData = await db.select().table(tableName);
    res.status(200).json({
      status: true,
      bearData: bearData
    });
}

exports.getId = async (tableName, req, res) => {
    const id = req.params.id;
  const bearData = await db(tableName)
    .where({
      id: id
    })
    .select();
  res.status(200).json({
    status: true,
    bearData: bearData
  });
}

exports.post = async (tableName, req, res) => {
    try {
        console.log(req.body);
        const bearID = await db(tableName).insert({
          name: req.body.name
        });
    
        res.status(200).json({
          status: true,
          bearID: bearID[0]
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          status: false,
          message: "There was problem in inserting data into db"
        });
      }
}

exports.del = async (tableName, req, res) => {
    const id = req.params.id;
    const deletedID = await db(tableName)
      .where({
        id: id
      })
      .del();
    res.status(200).json({
      status: true,
      deletedID: deletedID
    });
}

exports.put = async (tableName, req, res) => {
    const id = req.params.id;
    const updatedbear = await db(tableName).update("name", req.body.name);
    res.status(200).json({
      status: true,
      updatedbear: updatedbear
    });
}