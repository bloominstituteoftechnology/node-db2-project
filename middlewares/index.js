exports.assignTable = (req, res, next) => {
    req.url.includes('zoo') ? req.tableName = 'zoos' : req.tableName = 'bears'
    next()
}