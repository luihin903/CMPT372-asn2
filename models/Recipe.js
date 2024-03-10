const pool = require("./db");

module.exports = class Recipe {

    id; // SERIAL
    title; // VARCHAR(100)
    time; // BIGINT

    constructor(title) {
        this.title = title;
        this.time = Date.now();
    }

    async save() {
        var res = await pool.query("INSERT INTO recipes (title, time) VALUES ($1, $2) RETURNING id", [this.title, this.time]);
        this.id = await res.rows[0].id;
    }
}