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
    },

    insert: function(zoo){
        return db('zoos')
        .insert(zoo)
        .then( ([id]) => this.get(id) )
    },

    nameCheck: function(name){
        db('zoos')
            .where('name', name)
            .then(zoo => mappers.zooToBody(zoo))
    },

    update: function(id, changes){
        return db('zoos')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null))
    }
};