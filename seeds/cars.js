exports.seed = async function (knex) {
  await knex("cars").truncate();

  await knex("cars").insert([
    {
      VIN: "IJ4FYI9P4SP236650",
      Year: 1995,
      Make: "Jeep",
      Model: "Wrangler 4x4",
      Mileage: 161245,
      Price: 4300.0,
      Color: "Black",
    },

    {
      VIN: "JHMAP1144YT004312",
      Year: 2000,
      Make: "Honda",
      Model: "S2000",
      Mileage: 115000,
      Price: 15500.0,
      Color: "Blue",
    },

    {
      VIN: "6G3F25RW0HL306976",
      Year: 2017,
      Make: "Chevrolet",
      Model: "SS",
      Mileage: 31809,
      Price: 31955.0,
      Color: "Black",
    },

    {
      VIN: "1C3CDFAA9DD247077",
      Year: 2013,
      Make: "Dodge",
      Model: "Dart SE",
      Mileage: 97800,
      Price: 4950.0,
      Color: "Dark Blue",
    },

    {
      VIN: "WBSBL934X5PN61381",
      Year: 2005,
      Make: "BMW",
      Model: "M3",
      Mileage: 119000,
      Price: 19950.0,
      Color: "Yellow",
    },

    {
      VIN: "WAURV78T38A021105",
      Year: 2008,
      Make: "Audi",
      Model: "S5",
      Mileage: 144593,
      Price: 8950.0,
      Color: "Grey",
    },

    {
      VIN: "WMWMF935X9TF96970",
      Year: 2009,
      Make: "Mini",
      Model: "Cooper S JCW",
      Mileage: 64000,
      Price: 8990.0,
      Color: "Grey w/ Black Racing Stripes",
    },

    {
      VIN: "JM1NB353940400178",
      Year: 2004,
      Make: "Mazda",
      Model: "MX-5 Miata",
      Mileage: 159000,
      Price: 4690.0,
      Color: "Silver",
    },

    {
      VIN: "J3VW547AU6GM016972",
      Year: 2016,
      Make: "Volkwagen",
      Model: "GTI",
      Mileage: 66689,
      Price: 16900.0,
      Color: "White",
    },

    {
      VIN: "2T1BR32E73C132725",
      Year: 2003,
      Make: "Toyota",
      Model: "Corolla",
      Mileage: 197000,
      Price: 4900.0,
      Color: "Grey",
    },
  ]);
};
