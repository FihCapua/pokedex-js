const pokemonId = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonImg = document.querySelector('.pokemon__image');
const pokemonForm = document.querySelector('.pokemon__form');
const pokemonInput = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 241;

const fetchPokemon = async (pokemon) => {
    const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(url.status === 200) {
        const data = await url.json();
        return data;
    }
}

const showPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if(data) {
        const pokemonImgPath = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        pokemonImg.style.display = 'block';
        pokemonId.innerHTML = data.id;
        pokemonName.innerHTML = ` - ${data.name}`;
        pokemonImg.src = pokemonImgPath;
    
        pokemonInput.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :C';
        pokemonId.innerHTML = '';
        pokemonInput.value = '';
    }

}

pokemonForm.addEventListener('submit', (event) => {
    event.preventDefault();

    showPokemon(pokemonInput.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        showPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    showPokemon(searchPokemon);
});

showPokemon(searchPokemon);