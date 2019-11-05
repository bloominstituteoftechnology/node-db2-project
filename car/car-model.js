const db = require('../data/db-config.js')

module.exports = {
    get,
    insert,
    update,
    remove

}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
function get(id) {
    return id ? db('cars').where({ id }).first() : db('cars')
}
  

async function insert(carInfo) {
    const [id] = await db('cars').insert(carInfo, 'id');
    return get(id);
}
  
function update(id, changes) {
    return db('cars')
      .update(changes)
      .where({ id })
}
  
function remove(id) {
    return db('cars')
      .where({ id })
      .delete()
}