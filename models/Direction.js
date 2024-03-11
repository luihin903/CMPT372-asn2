const pool = require("./db");

module.exports = class Direction {

    id; // SERIAL
    recipe_id; // INTEGER
    step; // INTEGER
    content; // VARCHAR(100)

    constructor(recipe_id, step, content) {
        this.recipe_id = recipe_id;
        this.step = step;
        this.content = content;
    }

    async save() {
        var res = await pool.query("INSERT INTO directions (recipe_id, step, content) VALUES ($1, $2, $3) RETURNING id;", [this.recipe_id, this.step, this.content]);
        this.id = await res.rows[0].id;
    }

    static async getByRecipe(id) {
        var res = await pool.query("SELECT * FROM directions WHERE recipe_id = $1;", [id]);
        return res.rows;
    }

    static deleteByRecipe(id) {
        pool.query("DELETE FROM directions WHERE recipe_id = $1", [id]);
    }

}