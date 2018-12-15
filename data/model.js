const db = require('./dbConfig');
const mappers = require('./mappers')
 module.exports = {
    get: function(id){
        let query = db('zoos');
        return query.then(zoos => {
            return zoos.map(zoo => mappers.zooToBody(zoo))
        })
    }
};