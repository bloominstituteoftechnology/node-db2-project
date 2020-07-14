const express = require("express");

const server = express();

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`\n== API running on port ${PORT} ==\n`);
});

server.use(express.json());

db = require("./migrations/knexConfig");

server.get("/api/", (req, res) => {
    // get a list of posts from the database
    // SELECT * FROM posts
    db.select("*")
        .from("cars")
        .then((cars) => {
            res.status(200).json({ data: cars });
        })
        .catch((error) => {
            handleError(error, res);
        });

    // return the list of posts
});

server.post("/api/", (req, res) => {
    const carsData = req.body;

    // validate the data

    db("cars")
        .insert(carsData, "id")
        .then((ids) => {
            db("cars")
                .where({ id: ids[0] })
                .first()
                .then((car) => {
                    res.status(200).json({ data: car });
                });
        })
        .catch((error) => {
            handleError(error, res);
        });
});

function handleError(error, res) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
}
