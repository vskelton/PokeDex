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
      let pokemonList = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      listItem.classList.add("list-group-item");

      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("btn", "btn-primary");

      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener("click", function(event) {
        pokemonRepository.showDetails(pokemon);
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
      })
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showModal(title, text, img) {
      let modalTitle = document.querySelector("#pokemonModalLabel");
      let modalBody = document.querySelector(".modal-body");
      let pokemonHeight = document.querySelector("#pokemonHeight");
      let pokemonImage = document.querySelector("#pokemonImage");

      modalTitle.innerText = title;
      pokemonHeight.innerText = text;
      pokemonImage.setAttribute('src', img);
    }

  
    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        showModal(
          pokemon.name,
          "Height: " + pokemon.height,
          pokemon.imageUrl
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
      showDetails: showDetails
    };
})();
  
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  })
