/** @format */

const express = require("express");
const pokemonRouter = express.Router();

app.get("/pokemon/users/:user", async (req, res) => {
  try {
    const user = req.params.user;
    let list = getListOfPokemons(user);
    res.send(list);
  } catch {
    errorHandler(401, res);
  }
});
app.get("/pokemon/get/:id", async (req, res) => {
  let info = getPokemonByNameFromAPI(parseInt(req.params.id));
  info.then((result) => {
    res.send(result);
  });
  info.catch(() => {
    errorHandler(404, res);
  });
});

app.get("/pokemon/:query", async (req, res) => {
  let info = getPokemonByNameFromAPI(req.params.query);
  info.then((result) => {
    res.send(result);
  });
  info.catch(() => {
    errorHandler(404, res);
  });
});
app.put("/pokemon/catch/:user/:id", async (req, res) => {
  const { user, id } = req.params;
  let info = getPokemonByNameFromAPI(id);
  info.then((result) => {
    if (validate)
      try {
        catchPokemon(id, JSON.stringify(result), user);
      } catch {
        errorHandler(403, res);
      }
    catchPokemon(id, JSON.stringify(result), user);
    res.send(id);
  });
  info.catch(() => {
    errorHandler(404, res);
  });
});

app.delete("/pokemon/relese/:user/:id", async (req, res) => {
  const { user, id } = req.params;

  let info = await getPokemonByNameFromAPI(id);
  info.then((result) => {
    try {
      relesePokemon(id, user);
    } catch {
      errorHandler(403, res);
    }

    res.send(id);
  });
  info.catch(() => {
    errorHandler(404, res);
  });
});
module.exports = pokemonRouter;
