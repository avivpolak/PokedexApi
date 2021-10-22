const express = require("express");
const app = express();
const router = app.router();
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();

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
            console.log(info);
        })
        .catch(function (error) {
            throw new Error("There was an ERROR: ", error);
        });
}

router.get("/:id", async (req, res) => {
    getPokemonByNameFromAPI(parseInt(req.params.id));
});
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
module.exports = router;
