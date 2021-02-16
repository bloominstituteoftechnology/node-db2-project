const db = require('../../data/dbConfig')

const get = ()=>{
    return db("cars")
} 
const create = (newCar)=>{
    return db("cars").insert(newCar)
        .then(([id])=>{
            return db("cars").where("id",id).first();
        })
}
module.exports={
    get,
    create
}
