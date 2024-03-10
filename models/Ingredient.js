const pool = require("./db");

module.exports = class Ingredient {
    
    id; // SERIAL
    recipe_id; // INTEGER
    step; // INTEGER
    name; // VARCHAR(100)
    amount; // VARCHAR(100)

    constructor(recipe_id, step, name, amount) {
        this.recipe_id = recipe_id;
        this.step = step;
        this.name = name;
        this.amount = amount;
    }

    async save() {
        var res = await pool.query("INSERT INTO ingredients (recipe_id, step, name, amount) VALUES ($1, $2, $3, $4) RETURNING id", [this.recipe_id, this.step, this.name, this.amount]);
        this.id = await res.rows[0].id;
    }

}