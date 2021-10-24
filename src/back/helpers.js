const Pokedex = require("pokedex-promise-v2");
const { networkInterfaces } = require("os");
const P = new Pokedex();

function getListOfPokemons(user) {
    try {
        console.log("get list of pokemons");
        let returnedList = [];
        let list = fs.readdirSync(`./users/${user}`);
        for (let item of list) {
            returnedList.push(
                fs.readFileSync(`./users/${user}/${item}`).toString()
            );
        }
        console.log(returnedList);
        return returnedList;
    } catch (err) {
        throw new Error(`user ${user} not found`);
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
        throw new Error("404");
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
    fs.writeFileSync(`./users/${user}/${id}.json`, info);
}

function relesePokemon(id, user) {
    fs.unlinkSync(`./users/${user}/${id}.json`);
}

module.exports = {
    relesePokemon,
    catchPokemon,
    GetAbilities,
    Gettypes,
    getPokemonByNameFromAPI,
    getListOfPokemons,
};
