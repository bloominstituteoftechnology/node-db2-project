const verify = {
    //Verify that zoo.name exists within request body
    checkName: (req,res, next) => {
        errMsg = (req.baseUrl.includes('zoos')) 
            ? "Name of zoo is missing"
            : "Name of bear is missing"
        // const reqObject = req.body;
        if(req.body.name){
            next();
        }
        else{
            res.status(400)
            res.json({error: errMsg})
        }
    }

}

module.exports = verify;