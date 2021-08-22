// STRETCH
const cars = [
    {
        vin: '11J4GA59148L649857',
        make: 'toyota',
        model: 'prius',
        milage: 215000,
        title: 'clean',
        transmission: 'manual',
    },
    {
        vin: '21HGCP2F66CA173912',
        make: 'ford',
        model: 'focus',
        milage: 15000,
        title: 'clean',
    },
    {
        vin: '31GBJC34U65E164961',
        make: 'toyota',
        model: 'corolla',
        milage: 115000,
        title: 'salvage',
        
    },
]
exports.seed = async function(knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)  
}