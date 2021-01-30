const db = require('./dbConfig');



const sell = function(sell){
    const vehicle = db.select('*').from('car-dealer').where({'id': sell})
    console.log(vehicle)
    return vehicle
}

module.exports = {
    sell
}