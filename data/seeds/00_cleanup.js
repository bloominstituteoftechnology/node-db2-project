exports.seed = async function(knex) {
	await knex("cars").truncate()
	await knex("sales").truncate()
}
