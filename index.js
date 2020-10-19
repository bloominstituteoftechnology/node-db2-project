const server = require("./api/server");
const carsRouter = require("./cars/cars-router")

const PORT = process.env.PORT || 5000;

server.use("/", carsRouter);

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});