const usuariosRegistrados = [];
const inicialElegido = [];
const pokedex = [];

let favoritos = [];
if("favoritos" in localStorage){
    favoritos = JSON.parse(localStorage.getItem('favoritos'))
}else{
    favoritos = []; 
}

const perfil =[];
const pokemonInicial = [];
pokemonInicial.push(new Pokemon(1, "Bulbasaur", " PLANTA / VENENO", "../imagenes/pokedex/bulbasaur.png"));
pokemonInicial.push(new Pokemon(4, "Charmander", "FUEGO", "../imagenes/pokedex/charmander.png"));
pokemonInicial.push(new Pokemon(7, "Squirtle", "AGUA", "../imagenes/pokedex/squirtle.png"));