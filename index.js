const express = require("express");
const helmet = require("helmet");

const server = express();

// get knex setup
const knex = require("knex");

const knexConfig = require("./knexfile.js");

server.use(express.json());
server.use(helmet());

// connect to database
const db = knex(knexConfig.development);
// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

littlestory1 =
  "So, this potato had a weird want. He wanted to be an orange. Something about wanting to be more succulent, more vitamin C filled, more ... orange. Mostly he wanted to fit in with the fruits. Constantly being needled about being starchy was a painful experience for any young potato.";

littlestory2 =
  "But there was a small problem: there was no physical way that a potato could be an orange. No amount of orange dye, no amount of enfourced dieting or bouts of retching could change one's form from a potato to an orange.";

littlestory3 =
  "And no, this was not one of those potatos that wanted to learn how to be okay with it's appearance; no, total transformation was the goal, do or die. So what was this potato to do?";

const sendUserError = (status, message, res) => {
  // Stole this from Ryan. A helper method that we can use to send custom errors when something explodes.

  res.status(status).json({ errorMessage: message });
};

// lol lets just write it out the way we want.

// Alright my friends, let's check if we are alive in the beast.
server.get("/", (req, res) => {
  res.send(
    "Making sure we are all alive in the apocolypse. Maybe it's story time. Keep getting requests to the different endpoints, and a story will emerge."
  );
});

// POST /api/zoos - Make a new zoo; and hear about a potato that wants to be an orange.
server.post("/api/zoos", (req, res) => {
  //res.send(littlestory1);
  db("zoos")
    // db.insert(req.body).into('zoos').then().catch()
    .insert(req.body)
    // get back an array of ids
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// GET /api/zoos - Ahh crap, need to make a way to actually check if we posted.
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      sendUserError(
        500,
        "Weird, we could not pull up the zoos. Try something else?",
        res
      );
      return;
    });
});

// GET /api/zoos/:id
server.get("/api/zoos/:id", (req, res) => {
  const id = req.params.id;
  db("zoos")
    .where({ id })
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        sendUserError(
          404,
          "Shoot, we couldn't find your zoo. Sorry brah.",
          res
        );
      }
    })
    .catch(err => {
      sendUserError(500, "Sorry, couldn't get that zoo for yah.", res);
    });
});

// delete zoos
server.delete("/api/zoos/:id", (req, res) => {
  const id = req.params.id;

  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err =>
      sendUserError(500, "Sorry, couldn't delete that zoo for yah.", res)
    );
});

// edit bears/pandas w/e

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  db("zoos")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        sendUserError(404, "Sorry, that zoo doesn't seem to exist.", res);
      }
    })
    .catch(err => res.status(500).json(err));
});
