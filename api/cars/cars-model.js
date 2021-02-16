const db = require('../../data/dbConfig')

const get = ()=>{
    return db("cars")
} 
module.exports={
    get
}
