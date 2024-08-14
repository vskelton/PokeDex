let pokemonRepository = (function () {

    let pokemonList = [
        {name: 'Bulbasaur', height: '0.7', types: ['grass', 'poison']},
        {name: 'Charmander', height: '0.6', types: 'fire'},
        {name: 'Squirtle', height: '0.5', types: 'water'},
];

function add(pokemon) {
    pokemonList.push(pokemon);
}

function getAll() {
    return pokemonList;
}

return {
    add: add,
    getAll: getAll
};
})();

let pokemons = pokemonRepository.getAll();

pokemons.forEach(pokemon => { 

    document.write('<p>' + pokemon.name + ' | height: ' + pokemon.height + '</p>');
    if (pokemon.height <= 0.5) {
        document.write('Wow that is tiny!');
    }
});
