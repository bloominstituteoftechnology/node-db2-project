exports.seed = function (knex) {
  //deletes all entries
  return knex("cars")
    .truncate()
    .then(function () {
      //inserts seed entries
      return knex("cars").insert([
        {
          vin: "1FAFP42X22F155887",
          make: "Acura",
          model: "Integra",
          mileage: 1234,
          title: "clear",
          transmission: "automatic",
        },
        {
          vin: "1N4AL24E48C183514",
          make: "Ford",
          model: "Explorer",
          mileage: 1234,
          title: "clear",
          transmission: "automatic",
        },
        {
          vin: "4JGBB86E08A493670",
          make: "Dodge",
          model: "Durango",
          mileage: 1234,
          title: "clear",
          transmission: "automatic",
        },
        {
          vin: "1N4AA51E09C859535",
          make: "Tesla",
          model: "Model 1",
          mileage: 1234,
          title: "clear",
          transmission: "automatic",
        },
        {
          vin: "1FDWE37S9WHB23712",
          make: "Chevrolet",
          model: "Cavalier",
          mileage: 1234,
          title: "clear",
          transmission: "automatic",
        },
        {
          vin: "1HGCM56693A099508",
          make: "Honda",
          model: "CRV",
          mileage: 1234,
          title: "clear",
          transmission: "automatic",
        },
        {
          vin: "3VWRP69M83M171363",
          make: "Hyundai",
          model: "Sonata",
          mileage: 1234,
          title: "clear",
          transmission: "automatic",
        },
        {
          vin: "5GRGN22U67H186715",
          make: "Toyota",
          model: "Tacoma",
          mileage: 1234,
          title: "clear",
          transmission: "automatic",
        },
      ]);
    });
};
