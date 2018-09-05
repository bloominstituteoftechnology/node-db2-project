const router = require('express').Router();
const db = require('knex')(require('../knexfile').development);

router.post('/', (req, res) => {
  if (!req.body.name) res.status(404).json({ error: 'Zoos require a name.' });
  else {
    db('zoos')
      .insert(req.body)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json(err));
  }
});

router.get('/', (req, res) => {
  let cache = [];
  db('zoos as z')
    .leftJoin('bears as b', function () { this.on({ 'b.zooId': 'z.id' }) })
    .select('z.id', 'z.name', 'b.name as bears')
    .then(zoos => {
      zoos.forEach((zoo, ind) => {
        if (cache.includes(zoo.id)) {
          let dupe = zoos.find(z => z.id === zoo.id && z.bears !== zoo.bears);
          zoos[ind].bears = dupe.bears + `, ${zoo.bears}`;
          zoos.splice(zoos.findIndex(z => z.id === zoo.id), 1, 0); // placeholder for ind
        } else cache.push(zoo.id);
        if (!zoo.bears) zoo.bears = 'This zoo has no bears yet!';
      });
      res.status(200).json(zoos.filter(zoo => zoo)); // objects == true, 0 == false
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  let cache = [];
  db('zoos as z')
    .leftJoin('bears as b', function () { this.on({ 'b.zooId': 'z.id' }) })
    .select('z.id', 'z.name', 'b.name as bears')
    .then(zoos => {
      zoos.forEach((zoo, ind) => {
        if (cache.includes(zoo.id)) {
          let dupe = zoos.find(z => z.id === zoo.id && z.bears !== zoo.bears);
          zoos[ind].bears = dupe.bears + `, ${zoo.bears}`;
          zoos.splice(zoos.findIndex(z => z.id === zoo.id), 1, 0);
        } else cache.push(zoo.id);
        if (!zoo.bears) zoo.bears = 'This zoo has no bears yet!';
      });
      return zoos.filter(zoo => zoo).find(zoo => zoo.id === +id);
    })
    .then(zoo => {
      if (zoo) res.status(200).json(zoo);
      else res.status(404).json({ error: 'The zoo with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The zoo with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .update(req.body)
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The zoo with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
