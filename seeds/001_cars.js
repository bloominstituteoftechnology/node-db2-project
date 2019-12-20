exports.seed = aysnc function(knex) {
    await knex("cars").truncate()
    await knex("cars").insert([
        {}
    ])
}