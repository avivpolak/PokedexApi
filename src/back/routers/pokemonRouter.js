/** @format */

const express = require("express");
const pokemonRouter = express.Router();
const helpers = require("../helpers");
const errorHandler = require("../../middleware/errorHandler");
const e = require("express");

pokemonRouter.get("/users/:user", async (req, res) => {
    try {
        const user = req.params.user;
        let list = helpers.getListOfPokemons(user);
        res.send(list);
    } catch {
        errorHandler(401, res);
    }
});
pokemonRouter.get("/get/:id", async (req, res, next) => {
    try {
        let info = await helpers.getPokemonByNameFromAPI(
            parseInt(req.params.id)
        );
        res.send(info);
    } catch (err) {
        console.log(err);
        next(err, req, res);
        //  errorHandler(404, req, res);
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
pokemonRouter.put("/catch/:user/:id", async (req, res) => {
    const { user, id } = req.params;
    let info = helpers.getPokemonByNameFromAPI(id);
    info.then((result) => {
        if (validate)
            try {
                helpers.catchPokemon(id, JSON.stringify(result), user);
            } catch {
                helpers.errorHandler(403, res);
            }
        helpers.catchPokemon(id, JSON.stringify(result), user);
        res.send(id);
    });
    info.catch(() => {
        errorHandler(404, res);
    });
});

pokemonRouter.delete("/relese/:user/:id", async (req, res) => {
    const { user, id } = req.params;

    let info = await helpers.getPokemonByNameFromAPI(id);
    info.then((result) => {
        try {
            helpers.relesePokemon(id, user);
        } catch {
            helpers.errorHandler(403, res);
        }

        res.send(id);
    });
    info.catch(() => {
        errorHandler(404, res);
    });
});
module.exports = pokemonRouter;
