exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cars').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('cars').insert([
          {"vin":"SCBDC47L57C331538","make":"Dodge","model":"Viper","mileage":324035,"transmissionType":"Manual","titleStatus":"Salvage"},
          {"vin":"WVWBN7AN1FE568363","make":"Dodge","model":"Avenger","mileage":144696,"transmissionType":"Automatic","titleStatus":"Clean"},
          {"vin":"1FTEW1CF9FK853016","make":"Land Rover","model":"Range Rover","mileage":77697,"transmissionType":"Automatic","titleStatus":"Salvage"},
          {"vin":"3D7JB1EPXAG634638","make":"Mitsubishi","model":"Precis","mileage":133115,"transmissionType":"Manual","titleStatus":"Salvage"},
          {"vin":"1GD22XEG2FZ670313","make":"Honda","model":"Accord","mileage":17768,"transmissionType":"Automatic","titleStatus":"Salvage"},
          {"vin":"KMHCT4AE4FU852550","make":"Lincoln","model":"Town Car","mileage":56011,"transmissionType":"Manual","titleStatus":null},
          {"vin":"19UUA9F75EA433324","make":"Kia","model":"Sportage","mileage":132069,"transmissionType":"Automatic","titleStatus":"Clean"},
          {"vin":"WP0CB2A85FS714520","make":"Lexus","model":"SC","mileage":135979,"transmissionType":"Automatic","titleStatus":"Salvage"},
          {"vin":"5GAKRAED0CJ442468","make":"Subaru","model":"Impreza","mileage":140357,"transmissionType":"Manual","titleStatus":"Salvage"},
          {"vin":"1D4PT2GKXAW012912","make":"Mercedes-Benz","model":"E-Class","mileage":167955,"transmissionType":"Automatic","titleStatus":null},
          {"vin":"JH4KA96572C961336","make":"Ford","model":"F250","mileage":351697,"transmissionType":"Manual","titleStatus":"Salvage"},
          {"vin":"WAUFFBFL9CN367294","make":"Audi","model":"RS 4","mileage":31152,"transmissionType":"Automatic","titleStatus":"Salvage"},
          {"vin":"1N6AA0CJ5FN775683","make":"Chevrolet","model":"Impala","mileage":104212,"transmissionType":"Automatic","titleStatus":"Salvage"},
          {"vin":"TRUSX28N021850245","make":"Dodge","model":"Ram Van B350","mileage":355463,"transmissionType":"Manual","titleStatus":"Clean"},
          {"vin":"JN1BJ0HRXEM804625","make":"Volkswagen","model":"New Beetle","mileage":255495,"transmissionType":"Automatic","titleStatus":"Salvage"},
          {"vin":"3C63DRLL9CG737927","make":"Audi","model":"Allroad","mileage":251394,"transmissionType":"Manual","titleStatus":null},
          {"vin":"5TDDK3DC6FS957174","make":"Subaru","model":"Brat","mileage":132443,"transmissionType":"Automatic","titleStatus":"Salvage"},
          {"vin":"WAUMK98K99A819440","make":"Morgan","model":"Aero 8","mileage":295693,"transmissionType":"Automatic","titleStatus":null}
        ]);
      });
  };