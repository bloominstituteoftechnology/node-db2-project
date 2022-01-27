const Cars = require("./cars-model");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

test("[0] sanity check", () => {
  expect(true).not.toBe(false);
});

describe("Cars Model", () => {
  describe("Get all Cars", () => {
    let cars;
    beforeEach(async () => {
      cars = await Cars.getAll();
    });
    test("Returns All Cars", () => {
      expect(cars).toHaveLength(3);
    });
    test("Car Has Main Info", () => {
      expect(cars[0]).toMatchObject({
        id: 1,
        vin: "123456",
        make: "mazda",
        model: "3",
        mileage: 41211,
        title: "clean",
        transmission: "manual",
      });
    });
  });
});
describe("Car Get By ID", () => {
  let mazda;
  beforeEach(async () => {
    mazda = await Cars.getById(1);
  });
  test('Is it the Mazda?', () => {
    expect(mazda).toMatchObject({
      id: 1,
      vin: "123456",
      make: "mazda",
      model: "3",
      mileage: 41211,
      title: "clean",
      transmission: "manual",
    })
  })
});

describe('Made a new car', () => {
  let tesla = { 
  vin: "321654987",
  make: 'tesla', 
  model: "3",
  mileage: 0,
  title: "clean",
  transmission: "electric" }

  let result
  beforeEach(async () => {
    result = await Cars.create(tesla)
  })

  test('Car arrived', async () => {
    const newCar = await db('cars')
      .where('id', 4)
      .first()
    expect(newCar).toMatchObject({
      id: 4,
      vin: "321654987",
      make: "tesla",
      model: "3",
      mileage: 0,
      title: "clean",
      transmission: "electric"
    })
  })
  test('New car resolved', async () => {
    expect(result).toMatchObject({ 
      id: 4,
      vin: "321654987",
      make: "tesla",
      model: "3",
      mileage: 0,
      title: "clean",
      transmission: "electric" })
  })
})
