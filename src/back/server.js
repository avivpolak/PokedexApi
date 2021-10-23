/** @format */
const fs = require("fs");
const express = require("express");
const app = express();
const port = 4000;
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();

// route our app
app.get("/", function (req, res) {
  res.send("hello world!");
});

app.get("/pokemon/:user", async (req, res) => {
  const user = req.params.user;
  let list = getListOfPokemons(user);
  res.send(list);
});
app.get("/pokemon/get/:id", async (req, res) => {
  let info = getPokemonByNameFromAPI(parseInt(req.params.id));
  info.then((result) => {
    res.send(result);
  });
  info.catch(() => {
    res.status(404);
    res.send(`404 - not found pokemon with the id/name of ${parseInt(req.params.id)}`);
  });
});

app.get("/pokemon/:query", async (req, res) => {
  let info = getPokemonByNameFromAPI(req.params.query);
  info.then((result) => {
    res.send(result);
  });
  info.catch(() => {
    res.status(404);
    res.send(`404 - not found pokemon with the id/name of ${req.params.query}`);
  });
});
app.put("/pokemon/catch/:user/:id", async (req, res) => {
  const { user, id } = req.params;
  let info = getPokemonByNameFromAPI(id);
  info.then((result) => {
    //console.log();
    catchPokemon(id, JSON.stringify(result), user);
    res.send(id);
  });
  info.catch(() => {
    res.status(404);
    res.send(`404 - not found pokemon with the id/name of ${id}`);
  });
});

app.delete("/pokemon/relese/:user/:id", async (req, res) => {
  const { user, id } = req.params;
  let info = getPokemonByNameFromAPI(id);
  info.then((result) => {
    console.log(id, JSON.stringify(result), user);
    relesePokemon(id, user);
    res.send(id);
  });
  info.catch(() => {
    res.status(404);
    res.send(`404 - not found pokemon with the id/name of ${id}`);
  });
});

app.use(function (err, req, res, next) {
  // console.error(err.stack);
  // res.status(500).send("Something broke!");
});
// start the server
app.listen(port, function () {
  console.log("app started");
});

//functions
function getListOfPokemons(user) {
  let returnedList = [];
  let list = fs.readdirSync(`./users/${user}`);
  for (let item of list) {
    returnedList.push(fs.readFileSync(`./users//${user}/${item}`).toString());
  }
  return returnedList;
}
getListOfPokemons("aviv");
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
  fs.writeFileSync(`./users/${user}/${id}.txt`, info);
}

function relesePokemon(id, user) {
  fs.unlinkSync(`./users/${user}/${id}.txt`);
}
