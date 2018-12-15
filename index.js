const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to insert.'})
  })
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(arr => {
    if (arr.length > 0) {
    res.status(200).json(arr);
    } else {
     res.status(404).json({ error: 'No data to display.'})
    }
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to get info.'})
  })
});

server.get('/api/zoos/:id', (req, res) => {
 const {id} = req.params;
 db('zoos').where('id', id)
 .then(arr => {
   if (arr.length > 0) {
   res.status(200).json(arr)
   } else {
     res.status(404).json({ error: 'No data for given id.'})
   }
 })
 .catch(err => {
  res.status(500).json({ error: 'Failed to get info.'})
  }) 
});

server.delete('/api/zoos/:id', (req,res) => {
  const {id} = req.params;
  db('zoos').where('id', id).del()
  .then(count => {
    res.status(200).json({ success: 'Zoo successfully deleted' })
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to delete zoo.' })
  })
});

server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;
  if (zoo.name){ 
  db('zoos').update(zoo)
  .then(count => {
    if (count) {
    res.status(200).json({ success: 'Updated Zoo' });
    } else {
      res.status(404).json({ error: 'Zoo with that ID does not exist.' })
    }
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to update.'})
  })
  } else {
    res.status(400).json({ error: "Please provide a zoo name." })
  }
});

server.post('/api/bears', (req, res) => {
  const bear = req.body;
  db('bears').insert(bear)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to insert.'})
  })
});

server.get('/api/bears', (req, res) => {
  db.select('name').table('bears')
  .then(arr => {
    if (arr.length > 0) {
    res.status(200).json(arr);
    } else {
     res.status(404).json({ error: 'No data to display.'})
    }
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to get info.'})
  })
});

server.get('/api/bears/:id', (req, res) => {
  const {id} = req.params;
  db('bears').where('id', id)
  .then(arr => {
    if (arr.length > 0) {
    res.status(200).json(arr)
    } else {
      res.status(404).json({ error: 'No data for given id.'})
    }
  })
  .catch(err => {
   res.status(500).json({ error: 'Failed to get info.'})
   }) 
});

server.delete('/api/bears/:id', (req,res) => {
  const {id} = req.params;
  db('bears').where('id', id).del()
  .then(count => {
    res.status(200).json({ success: 'Bear successfully deleted' })
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to delete bear.' })
  })
});

server.put('/api/bears/:id', (req, res) => {
  const {id} = req.params;
  const bear = req.body;
  if (bear.name){ 
  db('bears').update(bear)
  .then(count => {
    if (count) {
    res.status(200).json({ success: 'Updated Bear' });
    } else {
      res.status(404).json({ error: 'Bear with that ID does not exist.' })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Failed to update.'})
  })
  } else {
    res.status(400).json({ error: "Please provide a bear name." })
  }
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
