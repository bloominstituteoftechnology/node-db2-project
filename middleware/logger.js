function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} and [${new Date().toISOString()}]`);
  next();
}

module.exports = logger;
