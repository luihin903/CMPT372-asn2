const { Pool } = require("pg");
var pool = new Pool({connectionString:"postgres://postgres:root@localhost:5432/cmpt372_asn2"});
module.exports = pool;