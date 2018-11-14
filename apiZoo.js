

//== API Routing ===============================================================

//-- Dependencies --------------------------------
const api      = require('./api-maker'      );
const database = require('./database-access');

//-- Constants -----------------------------------
const TABLE = 'zoos';

//-- Configure and Export API --------------------
module.exports = api(database(TABLE), {
    schemaValidator: async function (body) {
        // Get values from request body
        let name = body.name;
        // Validate values are present and proper type
        // - validate name is a string
        if(typeof name !== 'string' || !name.length){
            throw 'invalid project settings';
        }
        // Construct data from request
        return {
            name: name,
        };
    }
});
