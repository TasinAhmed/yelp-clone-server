const Pool = require("pg").Pool;

const pool = new Pool({ ssl: true });

module.exports = pool;
