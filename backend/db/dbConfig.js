const pgp = require("pg-promise")();
require("dotenv").config();

DATABASE_URL = process.env.DATABASE_URL;

const cn = DATABASE_URL ? {
    connectionString: DATABASE_URL,
    max: 30
} : {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
};

const db = pgp(cn);

module.exports = db;