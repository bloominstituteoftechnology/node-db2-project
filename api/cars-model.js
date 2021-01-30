const db=require('../data/db-config');

module.exports={get,
getById,
create,
update,
remove,
getCarSale}

async function get(){
    const cars= await db('cars')
    return cars;
}

async function getById(id){
    const cars= await db('cars').where({id})
    return cars;
}

async function create(newCars){
    const carId= await db('cars').insert(newCars)
    const newCar= getById(carId);
    return newCar;
}

async function update(id,changes){
    const updated= await db('cars').where({id}).update(changes)
    const car= await db('cars').where({id});
    return car;
}

async function remove(id){
    const removeId= await db('cars').where({id}).del()
    return removeId;
}

async function getCarSale(id){
    const saleStatus= await db("cars as c")
                            //inner join with id 
                            .innerJoin("carsale as s","s.carId", "c.id")
                            .where('s.carId', id) 
                            .select('s.sold' ,'s.price','c.id','c.model');
    return saleStatus;
}