const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <div class="clique" onclick="showModal(${pokemon.number})">      
        <li class="pokemon ${pokemon.type}">
                <span class="number" id="id">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    </div>    
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Obter a janela modal e o botão de fechar
var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no botão de fechar, fechar a janela modal
closeBtn.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clicar em qualquer lugar fora da janela modal, fechar a janela modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Função para exibir a janela modal
function showModal(id) {
    console.log(id)
    modal.style.display = "block";
}
