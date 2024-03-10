const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const Recipe = require("./models/Recipe");
const Ingredient = require("./models/Ingredient");
const Direction = require("./models/Direction");
const { Pool } = require("pg");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "views")));
app.use(body_parser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    return res.render("display");
})

app.get("/create", (req, res) => {
    return res.render("create");
})

app.post("/create", async(req, res) => {
    console.log(req.body);

    var recipe = new Recipe(req.body.title, req.body.countI, req.body.countD);
    await recipe.save();
    
    for (var i = 1; i <= req.body.countI; i ++) {
        var ingredient = new Ingredient(recipe.id, i, req.body[`ingredient-${i}`], req.body[`amount-${i}`]);
        await ingredient.save();
    }

    for (var i = 1; i <= req.body.countD; i ++) {
        var direction = new Direction(recipe.id, i, req.body[`direction-${i}`]);
        await direction.save();
    }

    return res.send(req.body);
})

app.listen(PORT);
console.log(`Running on port ${PORT}`);