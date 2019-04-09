const router = require('express').Router();

const knex = require('knex')

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
}

const db = knex(knexConfig);

// router.get('/', (req, res) => {
//     res.send('Hello World!') 
// })
  
router.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
        res.status(200).json(zoos)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});
  
router.get('/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
        if(zoo) {
            res.status(200).json(zoo)
        } else {
            res.status(404).json({ message: 'Animal not found!' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post('/', async (req, res) => {
    try {
        const [id] = await db('zoos').insert(req.body);
        const zoo = await db('zoos')
        .where({ id })
        .first()
        res.status(201).json(zoo)
    } catch (error) {
        res.status(500).json({ error: 'There was an error posting that!' })
    }
});

router.put('/:id', (req,res) => {
    db('zoos')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count > 0) {
            db('zoos')
            .where({ id:req.params.id })
            .first()
            .then(zoo => {
                res.status(200).json(zoo)
            })
        } else {
            res.status(404).json({ message: 'Animal not found!' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.delete('/:id', (req,res) => {
    db('zoos')
    .where({ id: req.params.id })
    .del(req.body)
    .then(count => {
        if (count > 0) {
            db('zoos')
            .where({ id:req.params.id })
            .first()
            .then(zoo => {
                res.status(200).json(zoo)
            })
        } else {
            res.status(404).json({ message: 'Animal not found!' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

module.exports = router;