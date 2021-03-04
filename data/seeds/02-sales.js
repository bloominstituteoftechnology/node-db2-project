// STRETCH
exports.seed = async function(knex) {
	await knex("sales").insert([
        {
            car_id: 4,
            buyer_name: 'John Smith',
            price: 26099,
        },
        {
            car_id: 2,
            buyer_name: 'Clara Oswald',
            price: 11988,
        },
        {
            car_id: 8,
            buyer_name: 'Mochiko Chunn',
            price: 5981,
        },

	])
}
