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

    static async getAll() {
        var res = await pool.query("SELECT * FROM recipes;");
        return res.rows;
    }

    static async getById(id) {
        var res = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
        return res.rows[0];
    }

    static deleteById(id) {
        pool.query("DELETE FROM recipes WHERE id = $1", [id]);
    }

    static edit(id, title) {
        pool.query("UPDATE recipes SET title = $1, time = $2 WHERE id = $3", [title, Date.now(), id]);
    }
}