exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('automobiles').del()
      .then(function () {
        // Inserts seed entries
  
        const automobiles = [
          {
            VIN: "123ABC456DEF",
            make: "Tesla",
            model: "Model S",
            mileage: "12,000",
            automatic: true,
            cleanTitle: true
          },
          {
            VIN: "789GHI012JKL",
            make: "Pontiac",
            model: "Firebird",
            mileage: "91,000",
            automatic: false,
            cleanTitle: false
          },
          {
            VIN: "345MNO678PQR",
            make: "Volkswagen",
            model: "Jetta",
            mileage: "36,124",
            automatic: "",
            cleanTitle: ""
          }, 
        ]
        return knex('automobiles').insert(automobiles);
      });
  };