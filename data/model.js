const db = require('./dbConfig');
const mappers = require('./mappers')

module.exports = {
    get: function(id){
        let query = db('zoos');

        if (id) {
            return query
            .where('id', id)
            .first()
            .then(zoo => mappers.zooToBody(zoo))
        }

        return query.then(zoos => {
            return zoos.map(zoo => mappers.zooToBody(zoo))
        })
    }
};