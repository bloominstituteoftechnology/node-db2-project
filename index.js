const server = require("./api/server");



const PORT = process.env.PORT|| 4000 ;

server.get('/api', (req, res)=>{
    
    const json = {
        messages:{
            welcome: 'Welcome to this API!',
            endpointsh3: 'Endpoints'
        } , 
        paths:{
            getVehicles: '/api/vehicles',
            postVehicle: 'api/vehicles/:obj'
        }
    }

    res.send(
        `<div>
            <h1>${json.messages.welcome}</h1>
            <h3>${json.messages.endpointsh3}</h3>
            <p>${json.paths.getVehicles}</p>
            <p>${json.paths.postVehicle}</p>
        </div>`
    )
})

server.listen(PORT, ()=> {
    console.log(`\n== API running on port ${PORT} ==\n`);
})