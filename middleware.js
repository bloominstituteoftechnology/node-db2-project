const verify = {
    checkName: (req,res, next) => {
        const zoo = req.body;
        if(zoo.name){
            next();
        }
        else{
            res.status(400)
            res.json({error: "Name of zoo is missing"})
        }
    }

}

module.exports = verify;