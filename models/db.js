const { Pool } = require("pg");
// var pool = new Pool({connectionString:"postgres://postgres:root@localhost:5432/cmpt372_asn2"});
var pool = new Pool({
    user : "postgres",
    host : "db",
    password : "root"    
});
pool.query("CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, title VARCHAR(100), time BIGINT);", (err, res) => {
    pool.query("CREATE TABLE IF NOT EXISTS ingredients (id SERIAL PRIMARY KEY, recipe_id INTEGER, step INTEGER, name VARCHAR(100), amount VARCHAR(100), FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE);");
    pool.query("CREATE TABLE IF NOT EXISTS directions (id SERIAL PRIMARY KEY, recipe_id INTEGER, step INTEGER, content VARCHAR(100), FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE);")
});

module.exports = pool;