const db=require('../../data/db-config');


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


module.exports={get,
    getById,
    create,
    update,
    remove,
    }