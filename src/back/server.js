/** @format */
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const Pokedex = require("pokedex-promise-v2");
const { networkInterfaces } = require("os");
const P = new Pokedex();
const errorHandler = require("../middleware/errorHandler");
const pokemonRouter = require("./routers/pokemonRouter");

app.get("/", function (req, res) {
    res.send("hello world!");
});
app.use("/pokemon", pokemonRouter);

// route our app

app.use(errorHandler);
app.listen(port, function () {
    console.log("app started");
});
