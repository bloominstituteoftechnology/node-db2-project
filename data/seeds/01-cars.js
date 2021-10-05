// STRETCH
exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert([
        {vin: '11111111111111110', make: "Ford", model: "F150", mileage: '145000'},
        {vin: '11111111111111112', make: "Ford", model: "F150", mileage: '20000'},
        {vin: '11111111111111113', make: "Ford", model: "F150", mileage: '10000'}
    ]);
};
