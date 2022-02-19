const Pool = require("pg").Pool

let localPoolConfig = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'pantheon'
}

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false}
} : localPoolConfig

const pool = new Pool(poolConfig)

module.exports = pool