const Zoos = require('./zoos-model');

const router = require('express').Router();





// router.get('/', (req, res) => {
//     db('zoos')
//     .then(zoos => {
//         res.status(200).json(zoos);
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });




router.post('/api/zoos', (req, res) => {
  Zoos.add(req.body)
  .then(zoo => {
      res.status(201).json(zoo)
  })
  .catch(err = res.status(500).json({message: 'Useful error message'}))
})

router.get('/api/zoos', (req, res) => {
    Zoos.find()
});

router.get('/api/zoos/:id', (req, res) => {
    res.send('');
});

router.delete('/api/zoos/:id', (req, res) => {
    res.send('');
});

router.put('/api/zoos/:id', (req, res) => {
    res.send('');
});


module.exports = router;