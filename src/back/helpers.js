const Pokedex = require("pokedex-promise-v2");
const { networkInterfaces } = require("os");
const P = new Pokedex();
const fs = require("fs");

function getListOfPokemons(user) {
    try {
        let returnedList = [];
        let list = fs.readdirSync(`./users/${user}`);
        for (let item of list) {
            returnedList.push(
                fs.readFileSync(`./users/${user}/${item}`).toString()
            );
        }
        return returnedList;
    } catch {
        let err = new Error("user not found");
        err.code = "401";
        throw err;
    }
}

async function getPokemonByNameFromAPI(name) {
    try {
        let response = await P.getPokemonByName(name);
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
    } catch {
        let err = new Error("cant find this pokemon");
        err.code = 404;
        throw err;
    }
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
    try {
        fs.writeFileSync(`./users/${user}/${id}.json`, info);
    } catch {
        let err = new Error("user not found");
        err.code = "401";
        throw err;
    }
}

function relesePokemon(id, user) {
    fs.readdir(`./users/${user}`, (err, data) => {
        if (!data) {
            let err = new Error("user not found");
            err.code = "401";
            throw err;
        } else {
            if (data.includes(`${id}.json`)) {
                fs.unlink(`./users/${user}/${id}.json`);
            } else {
                let err = new Error("trying to reles an uncought pokemon");
                err.code = "403";
                throw err;
            }
        }
    });
}

module.exports = {
    relesePokemon,
    catchPokemon,
    GetAbilities,
    Gettypes,
    getPokemonByNameFromAPI,
    getListOfPokemons,
};
