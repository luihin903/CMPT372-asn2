const express = require("express");
const PORT = 3000;
var app = express();

app.get("/", async(req, res) => {
    res.send("hi");
})

app.listen(PORT);
console.log(`Running on port ${PORT}`);