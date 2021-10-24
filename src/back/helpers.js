const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const fs = require("fs");

function getUser(user) {
    console.log("ass");
    let err = new Error();
    if (!fs.existsSync(`./users/${user}`)) {
        console.log("not here");
        err.message = "user not found";
        err.code = "401";
        throw err;
    }
    let returnedObj = { username: user };
    return JSON.stringify(returnedObj);
}
function getListOfPokemons(user) {
    let err = new Error();
    if (!fs.existsSync(`./users/${user}`)) {
        err.message = "user not found";
        err.code = "401";
        throw err;
    }
    let returnedList = [];
    let list = fs.readdirSync(`./users/${user}`);
    for (let item of list) {
        returnedList.push(
            fs.readFileSync(`./users/${user}/${item}`).toString()
        );
    }
    return returnedList;
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
    let err = new Error();
    if (!fs.existsSync(`./users/${user}`)) {
        err.message = "user not found";
        err.code = "401";
        throw err;
    }
    if (fs.existsSync(`./users/${user}/${id}.json`)) {
        err.message = "trying to catch an already cought pokemon";
        err.code = "403";
        throw err;
    }
    fs.writeFileSync(`./users/${user}/${id}.json`, info);
}

function relesePokemon(id, user) {
    let err = new Error();
    if (!fs.existsSync(`./users/${user}`)) {
        err.message = "user not found";
        err.code = "401";
        throw err;
    }
    if (!fs.existsSync(`./users/${user}/${id}.json`)) {
        err.message = "trying to relese an uncought pokemon";
        err.code = "403";
        throw err;
    }
    fs.unlink(`./users/${user}/${id}.json`);
}
function userNameExist(user) {
    return fs.existsSync(`./users/${user}`);
}
function createNewUserDir(user) {
    fs.mkdirSync(`./users/${user}`);
}

module.exports = {
    getUser,
    relesePokemon,
    catchPokemon,
    GetAbilities,
    Gettypes,
    getPokemonByNameFromAPI,
    getListOfPokemons,
    userNameExist,
    createNewUserDir,
};
