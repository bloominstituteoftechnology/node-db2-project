

//== Knex Database Builder =====================================================

//-- Dependencies --------------------------------
const knex       = require('knex'            );
const knexConfig = require('../knexConfig.js');

//-- Configure Knex Database ---------------------
const knexDB = knex(knexConfig.development);

//-- Export Database Access Builder --------------
module.exports = function (tableName/*, options*/) {
    return new DatabaseIntermediary(knexDB, tableName);
};


//== Database Intermediary Class ===============================================

class DatabaseIntermediary {
    constructor(knexDatabase, tableName) {
        this.db    = knexDatabase;
        this.table = tableName   ;
        // Create table
        knexDB.schema.hasTable(this.table)
        .then(exists => {
            if(exists){ return;}
            // To Do in the future: Make this a configuration option
            knexDB.schema.createTable(this.table, table => {
                table.increments('id').primary();
                table.string('name').unique().notNullable();
            })
        })
        // Errors configuring database are fatal
        .catch(error => {
            throw "Could not configure database";
        });
    }
    // Throw all errors as promise rejections
    async get(itemId){
        let query = this.db(this.table);
        if(itemId){
            query = query.where({id: itemId});
        }
        let result = await query;
        if(itemId){
            result = result[0];
        }
        return result;
    }
    async insert(item){
        return await this.db(this.table).insert(item);
    }
    async update(itemId, itemData){
        return await this.db(this.table).where({id: itemId}).update(itemData);
    }
    async remove(itemId){
        return await this.db(this.table).where({id: itemId}).del();
    }
};
