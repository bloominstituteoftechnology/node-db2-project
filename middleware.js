const verify = {
    //Verify that name exists within request body
    checkName: (req,res, next) => {
        
        if(req.body.name){
            next();
        }
        else{
            const errMsg = (req.baseUrl.includes('zoos')) 
                ? "Name of zoo is missing"
                : "Name of bear is missing";
                
            res.status(400)
            res.json({error: errMsg})
        }
    }

}

module.exports = verify;