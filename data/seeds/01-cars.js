// STRETCH
exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert([
        {vin: 'JNKCV51E03M018631', make: "Ford", model: "F150", mileage: 145000},
        {vin: 'JH4DA1740JS012019', make: "Ford", model: "F150", mileage: 20000},
        {vin: '1GCHK23D07F136336', make: "Ford", model: "F150", mileage: 10000}
    ]);
};
