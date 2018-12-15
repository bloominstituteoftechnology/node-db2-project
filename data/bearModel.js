const db = require('./dbConfig');
const mappers = require('./mappers')

module.exports = {
    get: function(id){
        let query = db('bears');

        if (id) {
            return query
            .where('id', id)
            .first()
            .then(bear => mappers.bearToBody(bear))
        }

        return query.then(bears => {
            return bears.map(bear => mappers.bearToBody(bear))
        })
    },

    insert: function(bear){
        return db('bears')
        .insert(bear)
        .then( ([id]) => this.get(id) )
    },

    nameCheck: function(name){
        db('bears')
            .where('name', name)
            .then(bear => mappers.bearToBody(bear))
    },

    update: function(id, changes){
        return db('bears')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null))
    },

    remove: function(id){
        return db('bears')
            .where('id', id)
            .del();
    }
};