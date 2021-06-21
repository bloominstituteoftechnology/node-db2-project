// STRETCH
const cars = [
    {
    vin:'1HD1KEM1XDB602203',
    make: 'toyota',
    model: 'prius',
    milege: 215000,
    title: 'clean'
    },
    {
        vin:'JH4NA1260NT000255',
        make: 'toyota',
        model: 'corola',
        milege: 215000,
        title: 'salvage'
        },
        {
            vin:'1FASP11J6TW112004',
            make: 'ford',
            model: 'focus',
            milege: 215000,
            title: 'clean'
            }
]
exports.seed = function (knex) {
    return knex('cars')
    .truncate().then(() => {
        return knex('cars').insert(cars)
    })
}
// exports.seed = async function (knex) {
//     await knex('cars').truncate()
//     await knex('cars').insert(cars)
// }

//1HD1KEM1XDB602203
//JH4NA1260NT000255
//KNDPBCA25B7076883
//1FASP11J6TW112004