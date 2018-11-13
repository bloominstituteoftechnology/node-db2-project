module.exports = (req, res, next) => {
  req.body.name && typeof req.body.name === 'string'
  ? next()
  : res.json({ error: "please provide a 'name' that is a string (i.e., in quotes)" })
}