const db = require('./dbConfig');



const sell = async function(id){
    return db.select('*').from('car-dealer').where({'id': id})

}

module.exports = {
    sell
}