const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
      // string or object
      filename: './data/lambda.sqlite3', // from the root folder
    },
    useNullAsDefault: true,
    //debug: true,
  };

  const db = knex(knexConfig)

  router.post('/', (req, res) => {
    db('zoos')
   .insert(req.body, "id")
   .then( ids =>{
     db('zoos')
     .where({id: ids[0]})
     .first()
     .then( zoo => {
       res.status(200).json(zoo)
     })
   }) .catch(err => {
    res.status(500).json(err);
  }) 
})





router.get('/', (req, res) => {
 db('zoos')
 .then( zoos =>{
  res.status(200).json(zoos)
 })
 .catch(err =>{
   res.status(500).json( {err: {message: oooops}})
 })
})


router.get('/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'zoo not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .update(req.body)
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'zoo does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'zoo does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});








module.exports = router;