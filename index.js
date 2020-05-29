require('dotenv').config()

const App = require('./server')

PORT = process.env.PORT || 5000

App.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})