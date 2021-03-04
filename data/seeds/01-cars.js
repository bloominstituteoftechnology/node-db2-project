// STRETCH
exports.seed = async function(knex) {
	await knex("cars").insert([
        {
            vin: '1GDHG31U141964412',
            make: 'Honda',
            model: 'Civic',
            mileage: 20342,
            title: 'clean',
            transmission: 'manual'
        },
        {
            vin: '4T1BF1FK6EU303219',
            make: 'Toyota',
            model: 'Corolla',
            mileage: 2342,
            title: 'clean',
            transmission: 'automatic'
        },
        {
            vin: '1N6AD0ER9EN717911',
            make: 'Honda',
            model: 'Accord',
            mileage: 203491,
            title: 'salvage',
            transmission: 'manual'
        },
        {
            vin: 'JTKKU10419J010834',
            make: 'Ford',
            model: 'F150',
            mileage: 200239,
            title: '',
            transmission: 'automatic'
        },
        {
            vin: 'WDDGF8AB8ER365448',
            make: 'Jeep',
            model: 'Grand Cherokee',
            mileage: 39274,
            title: 'clean',
            transmission: '4WD Automatic'
        },
        {
            vin: 'JN8CS1MU9DM105701',
            make: 'Tesla',
            model: 'Model 3',
            mileage: 42,
            title: 'clean',
            transmission: 'electric'
        },
        {
            vin: '4T3ZK11A69U010541',
            make: 'Mazda',
            model: 'Six',
            mileage: 7342,
            title: 'clean',
            transmission: ''
        },
        {
            vin: 'KNAGE228895344333',
            make: 'Honda',
            model: 'Civic EX',
            mileage: 93285,
            title: '',
            transmission: ''
        },
        {
            vin: 'KND4P131146547885',
            make: 'Subaru',
            model: 'Outback',
            mileage: 73342,
            title: 'clean',
            transmission: '4WD automatic'
        },
        {
            vin: '1B4HR28Y0XF653673',
            make: 'Chevrolet',
            model: 'Cruise',
            mileage: 35932,
            title: 'clean',
            transmission: ''
        },
        {
            vin: '3VWDT71K96M850133',
            make: 'Toyota',
            model: 'Prius',
            mileage: 43984,
            title: 'clean',
            transmission: 'electric'
        },
	])
}
