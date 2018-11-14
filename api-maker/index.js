

//== API Maker =================================================================

//-- Dependencies --------------------------------
const express = require('express');

//-- Configuration -------------------------------
module.exports = function(database, options){
    if(!options){ options = {};}
    const validator = validateSchema(options.schemaValidator);
    const API = express.Router();
    if(!options.skipGetAll ){ API.get   ('/'   , getAll.bind    (database))}
    if(!options.skipGetById){ API.get   ('/:id', getById.bind   (database))}
    if(!options.skipDelete ){ API.delete('/:id', deleteItem.bind(database))}
    if(!options.skipCreate ){ API.post  ('/'   , validator, create.bind    (database))}
    if(!options.skipUpdate ){ API.put   ('/:id', validator, updateItem.bind(database))}
    return API;
}


//== Schema Validator Middleware ===============================================

function validateSchema(validator){
    return async function (request, response, next) {
        try{
            let validSchema;
            if(validator){
                validSchema = await validator(request.body);
            } else{
                validSchema = Object.assign({}, request.body);
            }
            request.body.entryData = validSchema;
            next();
        }
        catch(error){
            response.status(400);
            response.json({
                errorMessage: "Provided data is invalid for this type of entry."
            });
            response.end();
        }
    };
}


//== Route Handlers ============================================================

//-- Get all Items -------------------------------
async function getAll(request, response, next) {
    // Retrieve all items from database, then send to user
    try{
        let items = await this.get();
        response.status(200);
        response.json(items);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The item array could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}

//-- Get an Item by Id ---------------------------
async function getById(request, response, next) {
    // Attempt to find item-data in database
    try{
        const itemId = request.params.id;
        let itemData = await this.get(itemId);
        // Inform the user if the requested data was not found
        if(!itemData){
            response.status(404);
            response.json({
                message: "The item with the specified ID does not exist.",
            });
        }
        // Send the requested data
        else{
            response.status(200);
            response.json(itemData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The item information could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}

//-- Create an Item ------------------------------
async function create(request, response, next) {
    // Get data from request
    let itemData = request.body.entryData;
    // Insert new item into database
    try{
        console.log(itemData)
        const result = await this.insert(itemData);
        const newItemId = result[0];
        response.status(201);
        response.json(newItemId);
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "There was an error while saving the item to the database"
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}

//-- Delete an Item ------------------------------
async function deleteItem(request, response, next) {
    // Attempt to remove identified item from database
    try{
        const itemId = request.params.id;
        const success = await this.remove(itemId);
        // Handle situations where specified item does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The item with the specified ID does not exist.",
            });
        }
        // Respond successfully
        else{
            response.status(204);
            response.end();
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The item could not be removed",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}

//-- Update an Item ------------------------------
async function updateItem(request, response, next) {
    // Get data from request
    let itemData = request.body.entryData;
    // Attempt to updated item data in database
    try{
        const itemId = request.params.id;
        const success = await this.update(itemId, itemData);
    // Handle situations where specified item does not exist
        if(!success){
            response.status(404);
            response.json({
                message: "The item with the specified ID does not exist.",
            });
        }
    // Inform of success
        else{
            const updatedItemData = await this.get(itemId);
            response.status(200);
            response.json(updatedItemData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The item information could not be modified.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
}
