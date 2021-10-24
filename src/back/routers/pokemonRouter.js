/** @format */

const express = require("express");
const pokemonRouter = express.Router();
const helpers = require("../helpers");

pokemonRouter.get("/users/:user", async (req, res, next) => {
    try {
        const user = req.params.user;
        let list = helpers.getListOfPokemons(user);
        res.send(list);
    } catch (err) {
        next(err);
    }
});

pokemonRouter.get("/get/:id", async (req, res, next) => {
    try {
        let info = await helpers.getPokemonByNameFromAPI(
            parseInt(req.params.id)
        );
        res.send(info);
    } catch (err) {
        next(err);
    }
});

pokemonRouter.get("/:query", async (req, res, next) => {
    try {
        let info = await helpers.getPokemonByNameFromAPI(req.params.query);
        res.send(info);
    } catch (err) {
        next(err);
    }
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
