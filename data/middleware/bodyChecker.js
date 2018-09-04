function bodyChecker(req, res, next) {
    if (req.body.name) {
      next();
    } else {
      res.status(500).json({ Error: "Must include name property" });
    }
}

module.exports = bodyChecker; 