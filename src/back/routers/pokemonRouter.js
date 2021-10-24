/** @format */

const express = require("express");
const pokemonRouter = express.Router();
const helpers = require("../helpers");
//const errorHandler = require("../../middleware/errorHandler");
const e = require("express");

pokemonRouter.get("/users/:user", async (req, res, next) => {
    console.log("sdfsdfsdf");
    try {
        const user = req.params.user;
        let list = helpers.getListOfPokemons(user);
        res.send(list);
    } catch (err) {
        next(err, req, res);
    }
});
pokemonRouter.get("/get/:id", async (req, res, next) => {
    try {
        let info = await helpers.getPokemonByNameFromAPI(
            parseInt(req.params.id)
        );
        res.send(info);
    } catch (err) {
        next(err, req, res);
    }
});

pokemonRouter.get("/:query", async (req, res) => {
    let info = helpers.getPokemonByNameFromAPI(req.params.query);
    info.then((result) => {
        res.send(result);
    });
    info.catch(() => {
        errorHandler(404, res);
    });
});
pokemonRouter.put("/catch/:user/:id", async (req, res, next) => {
    const { user, id } = req.params;
    try {
        let result = await helpers.getPokemonByNameFromAPI(id);
        helpers.catchPokemon(id, JSON.stringify(result), user);
        res.send(id);
    } catch (err) {
        next(err);
    }
});

pokemonRouter.delete("/relese/:user/:id", async (req, res, next) => {
    try {
        const { user, id } = req.params;
        helpers.relesePokemon(id, user);
        res.send(id);
    } catch (err) {
        next(err);
    }
});
module.exports = pokemonRouter;
