require('dotenv').config()
import server from './server'

const port = process.env.PORT || 4545

server.listen(port, () => {
  console.log(`\n=== Server listening on PORT ${port} ===\n`)
})