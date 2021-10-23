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
const errorHandler = require("../middleware/errorHandler");
app.use("/pokemon", pokemonRouter);

// route our app
app.get("/", function (req, res) {
  res.send("hello world!");
});

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
    else {
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

  let info = getPokemonByNameFromAPI(id);
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
app.use((req, res, next) => {
  return next(new Error("a error wrewe"));
});

app.use(errorHandler);

// app.use(function (err, req, res, next) {

//   errorHandler()

//   res.locals.message = err.message;
//   const status = err.status || 500;
//   res.locals.status = status;
//   res.render("../error");
// });
// start the server
app.listen(port, function () {
  console.log("app started");
});

//functions
function getListOfPokemons(user) {
  try {
    console.log("get list of pokemons");
    let returnedList = [];
    let list = fs.readdirSync(`./users/${user}`);
    for (let item of list) {
      returnedList.push(fs.readFileSync(`./users/${user}/${item}`).toString());
    }
    console.log(returnedList);
    return returnedList;
  } catch (err) {
    throw new Error(`user ${user} not found`);
  }
}

async function getPokemonByNameFromAPI(name) {
  return await P.getPokemonByName(name)
    .then(function (response) {
      let info = {
        name: response.name,
        height: response.height,
        weight: response.weight,
        types: Gettypes(response.types),
        front_pic: response.sprites.front_default,
        back_pic: response.sprites.back_default,
        abilities: GetAbilities(response.abilities),
      };
      return info;
    })
    .catch(function (error) {
      throw new Error("There was an ERROR: ", error);
    });
}
function Gettypes(types) {
  let rTypes = [];
  for (let obj of types) {
    rTypes.push(obj.type.name);
  }
  return rTypes;
}
function GetAbilities(abilities) {
  let rAbilities = [];
  for (let obj of abilities) {
    rAbilities.push(obj.ability.name);
  }
  return rAbilities;
}

function catchPokemon(id, info, user) {
  fs.writeFileSync(`./users/${user}/${id}.json`, info);
}

function relesePokemon(id, user) {
  fs.unlinkSync(`./users/${user}/${id}.json`);
}
