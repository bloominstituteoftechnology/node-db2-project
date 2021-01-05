const database = require('../data/config');

async function validateUserId(id) {
        try{
            const car = await database.first('*').from("car-dealer").where('id', id);
            if(car) {
                return car;
            } else {
                return {
                    errorMessage: "Could not find car id"
                }
            }
        } catch(error){
            console.log(error);
        }
}

module.exports = {
    validateUserId,
}
