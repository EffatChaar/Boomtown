const { Pool } = require('pg')

module.exports = function(app) {
  return new Pool({
    host: app.get('PG_HOST'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    port: app.get('PG_PORT'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000  
  })
}
