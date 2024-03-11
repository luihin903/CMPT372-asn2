const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const Recipe = require("./models/Recipe");
const Ingredient = require("./models/Ingredient");
const Direction = require("./models/Direction");
const { Pool } = require("pg");
const helper = require("./controllers/helper");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "views")));
app.use(body_parser.urlencoded({extended: true}));

app.get("/", async(req, res) => {
    var recipes = await Recipe.getAll();
    return res.render("display", {"recipes":recipes});
})

app.get("/recipe/:id", async(req, res) => {

    var recipe = await Recipe.getById(req.params.id);
    var ingredients = await Ingredient.getByRecipe(req.params.id);
    var directions = await Direction.getByRecipe(req.params.id);
    
    var time = helper.formatTime(recipe.time);

    return res.render("detail", {"recipe" : recipe, "ingredients" : ingredients, "directions" : directions, "time" : time});
})

app.get("/delete/:id", async(req, res) => {
    await Recipe.deleteById(req.params.id);
    return res.redirect("/");
})

app.get("/edit/:id", async(req, res) => {

    var recipe = await Recipe.getById(req.params.id);
    var ingredients = await Ingredient.getByRecipe(req.params.id);
    var directions = await Direction.getByRecipe(req.params.id);
    
    var countI = ingredients.length;
    var countD = directions.length;
    return res.render("edit", {"recipe" : recipe, "ingredients" : ingredients, "directions" : directions, "countI" : countI, "countD" : countD});
})

app.post("/edit/:id", async(req, res) => {
    await Ingredient.deleteByRecipe(req.params.id);
    await Direction.deleteByRecipe(req.params.id);
    await Recipe.edit(req.params.id, req.body.title);
    
    for (var i = 1; i <= req.body.countI; i ++) {
        var ingredient = new Ingredient(req.params.id, i, req.body[`ingredient-${i}`], req.body[`amount-${i}`]);
        await ingredient.save();
    }

    for (var i = 1; i <= req.body.countD; i ++) {
        var direction = new Direction(req.params.id, i, req.body[`direction-${i}`]);
        await direction.save();
    }

	res.redirect(`/recipe/${req.params.id}`);
})

app.get("/create", (req, res) => {
    return res.render("create");
})

app.post("/create", async(req, res) => {

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

    res.redirect("/");
})

app.listen(PORT);
console.log(`Running on port ${PORT}`);