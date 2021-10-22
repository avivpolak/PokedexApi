/** @format */

const express = require("express");
const app = express();
const port = 3000;
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();

//const router = require("./PokemonRouter");

// route our app
app.get("/", function (req, res) {
  res.send("hello world!");
});

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
app.get("/pokemon/get/:id", async (req, res) => {
  let info = getPokemonByNameFromAPI(parseInt(req.params.id));
  info.then((result) => {
    res.send(result);
  });
  info.catch((err) => {
    res.status(404);
    res.send("404");
  });

  // console.log(info);
  // res.send(info);
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//app.get("/pokemon/get", router);
// function getPokemonByNameFromAPI(name) {
//     P.getPokemonByName(name, function (response, error) {
//         // with callback
//         if (!error) {
//             let info = {
//                 name: response.name,
//                 height: response.height,
//                 weight: response.weight,
//                 types: Gettypes(response.types),
//                 front_pic: response.sprites.front_default,
//                 back_pic: response.sprites.back_default,
//                 abilities: GetAbilities(response.abilities),
//             };
//             console.log(info);
//         } else {
//             throw new Error("not found");
//         }
//     });
// }
// getPokemonByNameFromAPI("pikachu");
// function Gettypes(types) {
//     let rTypes = [];
//     for (let obj of types) {
//         rTypes.push(obj.type.name);
//     }
//     return rTypes;
// }
// function GetAbilities(abilities) {
//     let rAbilities = [];
//     for (let obj of abilities) {
//         rAbilities.push(obj.ability.name);
//     }
//     return rAbilities;
// }
// start the server
app.listen(port, function () {
  console.log("app started");
});
