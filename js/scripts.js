let pokemonList = [
    {name: 'Bulbasaur', height: '0.7', types: ['grass', 'poison']},
    {name: 'Charmander', height: '0.6', types: 'fire'},
    {name: 'Squirtle', height: '0.5', types: 'water'},
];

for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    console.log('name:', pokemon.name);
    console.log('height:', pokemon.height);
    document.write('<p>Name:' + pokemon.name + '| Height:' + pokemon.height + '</p>');
    if (pokemon.height <= 0.5) {
        document.write('Wow that is tiny!');
    }
}