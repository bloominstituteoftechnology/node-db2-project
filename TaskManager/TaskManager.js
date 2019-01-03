const knex = require ('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);



const getAllZoos = (req, res) =>{
        db.select().table('zoos')
        .then(zoos =>{
          res.status(200).json(zoos)
        })
        .catch(err =>{
          res.status(500).json(err)
        })
}

const getAZoo = ( req, res) =>{
        const {id} = req.params;
        db('zoos').where('id', id)
        .then(zoos =>{
          res.status(200).json(zoos)
        })
        .catch(err =>{
          res.status(500).json(err)
        })
}

const CreateNewAZoo = (req, res) =>{
  // GRAB DATA FROM THE BODY
  const Zoos = req.body;
  // SAVE DATA TO DATABASE
  db('zoos').insert(Zoos)
  // RETURN ID OF NEWLY CREATED RECORD
  .then(id =>{
    res.status(201).json({message :`Zoo inserted with ID :${id}`})
  })
  .catch(err =>{
    res.status(500).json(err)
  })  
}

const UpdateZoo = (req, res) =>{
    const {id} = req.params;
    const newZoos = req.body;
    db('zoos').where({id})
    .update(newZoos)
    .then(ids =>{
      res.status(200).json(ids)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}

const DestroyAZoo = (req, res) =>{
    const {id} = req.params;
    db('zoos').where({id})
    .del()
    .then(ids =>{
      res.status(200).json(ids)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}


/// BEARS

const getAllBears = (req, res) =>{
    db.select().table('bears')
    .then(bears =>{
      res.status(200).json(bears)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}

const getABear = ( req, res) =>{
    const {id} = req.params;
    db('bears').where('id', id)
    .then(bears =>{
      res.status(200).json(bears)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}

const CreateNewBear = (req, res) =>{
// GRAB DATA FROM THE BODY
const Bears = req.body;
// SAVE DATA TO DATABASE
db('bears').insert(Bears)
// RETURN ID OF NEWLY CREATED RECORD
.then(id =>{
res.status(201).json({message :`Bear inserted with ID :${id}`})
})
.catch(err =>{
res.status(500).json(err)
})  
}

const UpdateBear = (req, res) =>{
const {id} = req.params;
const newBears = req.body;
db('bears').where({id})
.update(newBears)
.then(ids =>{
  res.status(200).json(ids)
})
.catch(err =>{
  res.status(500).json(err)
})
}

const DestroyABear = (req, res) =>{
const {id} = req.params;
db('bears').where({id})
.del()
.then(ids =>{
  res.status(200).json(ids)
})
.catch(err =>{
  res.status(500).json(err)
})
}


module.exports = {
    DestroyAZoo    : DestroyAZoo,
    UpdateZoo      : UpdateZoo,
    CreateNewAZoo   : CreateNewAZoo ,
    getAZoo         : getAZoo,
    getAllZoos      : getAllZoos, 
    DestroyABear    : DestroyABear,
    UpdateBear      : UpdateBear,
    CreateNewBear   : CreateNewBear ,
    getABear         : getABear,
    getAllBears      : getAllBears 
}