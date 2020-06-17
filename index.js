const express = require("express");
const api = require("./api");

const app = express();

// set up port to listen on
const port = process.env.PORT || 3000;

// Parse incoming post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup ap routes
app.use("/api", api);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
