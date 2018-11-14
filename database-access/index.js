

//== Knex Database Builder =====================================================

//-- Dependencies --------------------------------
const knex       = require('knex'            );
const knexConfig = require('../knexConfig.js');

//-- Configure Knex Database ---------------------
const knexDB = knex(knexConfig.development);

//-- Export Database Access Builder --------------
module.exports = async function (tableName/*, options*/) {
    let exists = await knexDB.schema.hasTable('tableName');
    if(!exists){
        // To Do in the future: Make this a configuration option
        await knexDB.schema.createTable('tableName', table => {
            table.increments('id').primary();
            table.string('name').unique().notNullable();
        });
    }
    return new DatabaseIntermediary(knexDB, tableName);
}


//== Database Intermediary Class ===============================================

class DatabaseIntermediary {
    constructor(knexDatabase, table) {
        this.db    = knexDatabase;
        this.table = table       ;
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

/*-- Testing -------------------------------------
(async function (table){
    let db = module.exports[table];
    // Test Insert
    let newName = `Test ${db.table} ${Math.floor(Math.random()*8999+1000)}`;
    let result = await db.insert({name: newName});
    console.log('Test Insert:')
    let newId = result[0];
    console.log(newId);
    // Test Get
    console.log('Test Get All:')
    result = await db.get();
    console.log(result);
    // Test Update
    console.log('Test Update:')
    result = await db.update(newId, {name: 'FooBar'});
    console.log(result);
    // Test Remove
    console.log('Test Remove:')
    result = await db.remove(newId);
    console.log(result);
})('zoos');
*/
