// const { Pool, Client } = require('pg')
import Pool from 'pg-pool';

const pool = new Pool({
    // user: 'postgres',
    // host: '127.0.0.1',
    // database: 'sortit',
    // password: 'admin',
    // port: 5432,
    connectionString: "postgres://lbycqplt:Cp5qu02VLH57ejVqUWP4SKwfGIjVTdxH@abul.db.elephantsql.com/lbycqplt"
})
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })


// module.exports = pool;
export default pool;