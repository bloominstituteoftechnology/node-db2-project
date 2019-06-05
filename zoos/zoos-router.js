const knex = require('knex');

const router = require('express').Router();
const zoos = require('./zoos-model.js/index.js');


const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3',
  },
  useNullAsDefault: true, // required only for sqlite3
  // debug: true,
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
  Zoos.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  // select * from zoos where id = 123
  Zoos.findById(req.params.id)
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'Zoo not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  Zoos.find()
    .insert(req.body, 'id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body; 
  Zoos.find()
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} records updated` });
      } else {
        res.status(404).json({ message: 'Zoo not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  Zoos.find()
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        const unit = count > 1 ? 'records' : 'record';
        res.status(200).json({ message: `${count} ${unit} deleted` });
      } else {
        res.status(404).json({ message: 'Zoo not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;