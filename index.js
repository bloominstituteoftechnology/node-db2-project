const express = require('express')
server = express()
// cors = require('cors')
port = 8000
// projectDB = require('../data/helpers/projectModel')
// actionsDB = require('../data/helpers/actionModel')
const helmet = require ('helmet')
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

// const db = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: './data.sqlite3',
//   },
//   useNullAsDefault: true,
// });

// server.use(cors())
server.use(helmet())
server.use(express.json())

// server.get('/',(req,res)  => {
//     res.send('API Up & Running');
// });

// server.get('/api/zoos', async (req, res, next) => {
//     try {
//       const zoo = await db('SELECT * FROM zoos'); // <=
//       res.send(zoo);
//     } catch (err) {
//       next(err);
//     }
//   });

  server.get('/api/zoos', (req, res) => {
    
      db('zoos').then(zoos => {
          res.status(200).json(zoos);
      }) 
    
     .catch (err => res.status(500).json(err))  
  });

  server.get('/api/zoos/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('zoos')
      .where('id', '=', id) // or .where({ id: id })
     
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });



server.post('/api/zoos', (req, res) => {
    const character = req.body;
  
    db.insert(character)
      .into('zoos')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.put('/api/zoos/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('zoos')
      .where('id', '=', id) // or .where({ id: id })
      .update(changes)
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });


  server.delete('/api/zoos/:id', (req, res) => {
    const { id } = req.params;
  
    db('zoos')
      .where({ id }) // or .where(id, '=', id)
      .del()
      .then(count => {
        // count === number of records deleted
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

//  get for actions and projects

server.get('/api/projects', (req, res) => {
    projectDB
        .get()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

server.get('/api/actions', (req, res) => {
    actionsDB
        .get()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})



server.get('/api/projects/:id', (req, res) => {
    let { id } = req.params
    if (id) {
        projectDB
            .get(id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    } else {
        res.status(400).json({ error: "Please include an ID" })
    }
})

server.get('/api/actions/:id', (req, res) => {
    let { id } = req.params
    if (id) {
        actionsDB
            .get(id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    } else {
        res.status(400).json({ error: "Please include an ID" })
    }
})

// posts

server.post('/api/projects', (req, res) => {
    let { name, description } = req.body
    console.log(name, description)
    if (name === undefined || description === undefined) {
        res.status(400).json({ error: "Please complete the project data" })
    }
    projectDB
        .insert({ name, description })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "a database error occured, please try again later" })
        })
})

server.post('/api/actions', (req, res) => {
    let { notes, description } = req.body
    actionsDB.insert({ notes: notes, description: description })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "a database error occured, please try again later" })
        })
})

// server.post('/', (req, res) => {
//     let { project_id, description, completed, notes } = req.body
//     if (project_id === undefined || description === undefined || completed === undefined || notes === undefined) {
//         res.status(400).json({ error: "Please complete the project data" })
//     }
//     db
//         .insert({ project_id, description, completed, notes })
//         .then(result => {
//             res.json(result)
//         })
//         .catch(err => {
//             res.status(500).json({ error: "a database error occured, please try again later" })
//         })
// })

// deletes

server.delete('/api/projects/:id', (req, res) => {
    let { id } = req.params
    console.log("fire", id)
    projectDB.get(id)
        .then(result => {
            projectDB.remove(id)
                .then(count => {
                    res.json(result)
                })
                .catch(err => {
                    res.status(500).json({ error: "a database error occured, please try again later" })
                })
        })
        .catch(err => {
            res.status(500).json({ error: "a database error occured, please try again later" })
        })
})

server.delete('/api/actions/:id', (req, res) => {
    let { id } = req.params
    console.log("fire", id)
    actionsDB.get(id)
        .then(result => {
            projectDB.remove(id)
                .then(count => {
                    res.json(result)
                })
                .catch(err => {
                    res.status(500).json({ error: "a database error occured, please try again later" })
                })
        })
        .catch(err => {
            res.status(500).json({ error: "a database error occured, please try again later" })
        })
})

// updates

server.put('/api/projects/:id', (req, res) => {
    let { name, description, completed } = req.body
    let { id } = req.params
    completed === undefined ? completed = false : completed
    projectDB.update(id, { name: name, description: description, completed: completed })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "a database error occured, please try again later" })
        })
})


server.put('/api/actions/:id', (req, res) => {
    let { notes, description, completed } = req.body
    let { id } = req.params
    completed === undefined ? completed = false : completed
    actionsDB.update(id, { notes: notes, description: description, completed: completed })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "a database error occured, please try again later" })
        })
})



server.listen(port, () => console.log(`== Server Running on Port ${port} ==`))