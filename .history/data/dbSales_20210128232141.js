const db = require('./dbConfig');



const sell = function(id){
    return db.select('*').from('car-dealer').where({id: id})

}

module.exports = {
    sell
}