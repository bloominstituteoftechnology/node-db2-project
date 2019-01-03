const express = require('express');
const routerZoos = express.Router();
const routerBears = express.Router();
const TaskManager = require('../TaskManager/TaskManager.js')



// routes for Zoos and Bears
routerZoos.get('/', TaskManager.getAllZoos);
routerZoos.post('/', TaskManager.CreateNewAZoo);
routerZoos.get('/:id', TaskManager.getAZoo);
routerZoos.put('/:id', TaskManager.UpdateZoo);
routerZoos.delete('/:id', TaskManager.DestroyAZoo);

// Bears
routerBears.get('/', TaskManager.getAllBears);
routerBears.post('/',  TaskManager.CreateNewBear);
routerBears.get('/:id',  TaskManager.getABear);
routerBears.put('/:id',  TaskManager.UpdateBear);
routerBears.delete('/:id',  TaskManager.DestroyABear);

module.exports = {
    
    routerZoos : routerZoos,
    routerBears : routerBears
};