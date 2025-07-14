let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon)
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'w-100');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#pokemonModal');

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    button.addEventListener('click', function () {
      pokemonRepository.showDetails(pokemon);
    });
  }

  function displayPokemonList(pokemonArray) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    pokemonListElement.innerHTML = '';

    if (pokemonArray.length === 0) {
      pokemonListElement.innerHTML = '<li class="list-group-item text-center">No Pokemon found.</li>';
      return;
    }

    pokemonArray.forEach(function (pokemon) {
      addListItem(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
      let pokemonListElement = document.querySelector('.pokemon-list');
      pokemonListElement.innerHTML = '<li class="list-group-item text-danger text-center">Failed to load Pokemon data. Please try again later.</li>';
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(typeInfo => typeInfo.type.name);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(title, height, imageUrl, types) {
    let modalTitle = document.querySelector('#pokemonModalLabel');
    let pokemonHeight = document.querySelector('#pokemonHeight');
    let pokemonImage = document.querySelector('#pokemonImage');
    let pokemonTypes = document.querySelector('#pokemonTypes');

    modalTitle.innerText = title;
    pokemonHeight.innerText = 'Height: ' + height / 10 + 'm'
    pokemonImage.setAttribute('src', imageUrl);
    pokemonImage.setAttribute('alt', title);

    if (types && types.length > 0) {
      if (pokemonTypes) {
        pokemonTypes.innerText = 'Type(s): ' + types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ');
      }
    } else if (pokemonTypes) {
      pokemonTypes.innerText = '';
    }
  }


  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        pokemon.height,
        pokemon.imageUrl,
        pokemon.types
      );
      $('#pokemonModal').modal('show');
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    displayPokemonList: displayPokemonList,
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  const pokemonSearchInput = document.getElementById('pokemonSearchInput');
  const searchButton = document.getElementById('searchButton');

  pokemonRepository.loadList().then(function () {
    pokemonRepository.displayPokemonList(pokemonRepository.getAll());
  });

  function handleSearch() {
    const searchTerm = pokemonSearchInput.value.toLowerCase().trim();
    const allPokemon = pokemonRepository.getAll();

    const filteredPokemon = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
    pokemonRepository.displayPokemonList(filteredPokemon);
  }

  searchButton.addEventListener('click', handleSearch);

  pokemonSearchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
});
