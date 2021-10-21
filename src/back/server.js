const express = require("express");
const app = express();
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const port = 8080;

// start the server
app.listen(port, function () {
    console.log("app started");
});

// route our app
app.get("/", function (req, res) {
    res.send("hello world!");
});

function getPokemonByNameFromAPI(name) {
    P.getPokemonByName(name, function (response, error) {
        // with callback
        if (!error) {
            let info = {
                name: response.name,
                height: response.height,
                weight: response.weight,
                types: Gettypes(response.types),
                front_pic: response.sprites.front_default,
                back_pic: response.sprites.back_default,
                abilities: GetAbilities(response.abilities),
            };
            console.log(info);
        } else {
            throw new Error("not found");
        }
    });
}
getPokemonByNameFromAPI("pikachu");
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
