exports.seed = async function (knex){
    //clear out all the rows in the table and reset it
    await knex("cars").truncate()

    //popluate the table with some static test data
    await knex("cars").insert([
        {VIN:"38758BDF12", make: "Tesla", model: "3X", mileage:"1000"},
        {VIN:"39572OGK10", make: "Toyota", model: "CAMRY", mileage:"12000"},
        {VIN:"87589HOG53", make: "Honda", model: "PILOT", mileage:"39000"},
        {VIN:"63789OYS69", make: "BMW", model: "X5", mileage:"34255"},
        {VIN:"78395TJK42", make: "Mercedes", model: "SPRINTER", mileage:"12526"},
    ])
}