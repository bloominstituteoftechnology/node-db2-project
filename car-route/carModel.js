const db = require("../data/config")

function CarInfo(carID){
    return  db("cars").insert({Vin:req.body.Vin,Make:req.body.Make,Model:req.body.Model,Mileage:req.body.Mileage })
}
module.exports={
    CarInfo,
}