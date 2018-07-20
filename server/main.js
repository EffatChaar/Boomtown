const express = require('express')

const config = require('./config/application')

const app = express()
const PORT = config(app)

const initDB = require('./config/postgres')
const postgres = initDB(app)

let pgResource = require('./api/pg-resource')
pgResource = pgResource(postgres)


 const initApollo = require('./config/apollo')
 initApollo({ app, pgResource })


postgres.on('error', (err, client) => {
  console.error('Unexpected error on idle postgres client', err)
  process.exit(-1)
})

const server = app.listen(PORT, () => {
  console.log(`>>\x1b[34m Express running:\x1b[0m http://localhost:${PORT}`)

 

   console.log(
    `>>\x1b[35m Graphql playground:\x1b[0m http://localhost:${PORT}/graphql`
   )
})

server.on('error', err => {
  console.log(err)
})
