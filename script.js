const poke_container = document.getElementById('poke-container')
const pokemon_count = 150;
//defining colors for each type
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}
//converting keys of object to array
const main_types = Object.keys(colors)

//fetching pokemon data for pokemon_count
const fetchPokemon  = async ()=>{
    for(let i = 1;i<=pokemon_count;i++){
        await getPokemon(i)
    }
}
//fetching pokemon data for each pokemon by id 
const getPokemon = async (id)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json();
    createPokemonCard(data)
}

//creating new pokemon card and defining its html in my flex page
const createPokemonCard = (pokemon) => {
    const pokemonE1 = document.createElement('div')
    pokemonE1.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3,'0')
//defining pokmon type
    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type=> poke_types.indexOf(type))
    const color = colors[type];

    pokemonE1.style.background = color;
//html for pokemon card 
    const pokemonInnerHtml = `
    <div class = "img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt = "lund pokemon" >
    </div>
    <div class="info">
        <span class = "number">${id}</span>
        <h3 class = "name">${name}</h3>
        <small class = "type"> Type: ${type}</small>
    </div>
    `
    pokemonE1.innerHTML = pokemonInnerHtml

    poke_container.appendChild(pokemonE1)
}

fetchPokemon()
