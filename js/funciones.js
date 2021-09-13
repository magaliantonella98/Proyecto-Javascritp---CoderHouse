function Pokemon(id, nombre, tipo, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.imagen = imagen;
}

function Usuario(nombre, apellido, edad) {
    this.nombre = nombre.toUpperCase();
    this.apellido = apellido.toUpperCase();
    this.edad = parseInt(edad);
}
//------------Inicio
const ocultarRegistrar = () => {
    if ("usuarios" in localStorage) {
        $(".btnInicio").css("display", "none");
        $(".dato").css("display", "none");

    }
}
//-----------Registro
function registroDatos() {
    const formulario = document.getElementById("registroFormulario");

    formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = this.getElementsByClassName("registroDatos");

    const nuevoUsuario = new Usuario(inputs[0].value,
                                     inputs[1].value,
                                     inputs[2].value,
                                     inputs[3].value);

    perfil.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(perfil)); 
    window.location.href = "inicial.html";
    })
}
//----------Pokemon Inicial
function Iniciales(){
    for (const pokemon of pokemonInicial) {
        let opciones = document.createElement('div');
        opciones.classList.add('opcionesInicial');
        opciones.innerHTML = `  <h4>${pokemon.nombre}</h4>
                                <img class="inicialImg" src="../imagenes/pokebola.png">
                                <img style="display: none" class="inicialImg2" src="${pokemon.imagen}">
                                <input id="${pokemon.id}" type="submit" class="btnElegir" value="ELEGIR">
                                `;
        document.getElementById("opciones").appendChild(opciones);
    };
}
function elegirInicial(e) {
    e.preventDefault();
    const pokemonElegido = pokemonInicial.find(pokemon => pokemon.id == this.id);

    perfil.push(pokemonElegido);
    localStorage.setItem("inicial", JSON.stringify(perfil));
    window.location.href = "perfil.html";

}
const animarPokebola = () => {
    const animar = $(".btnShow");
    for (const pokebola of animar) {
        pokebola.onclick = ocultarMostrar;
    }
}
const ocultarMostrar = () => {
    $(".inicialImg").toggle();
    $(".inicialImg2").toggle();

}
//------------Pokedex
function Pokedex(){
    const urlget = "../json/datos.json"
    $.get(urlget, function (datos, estado) {
        if (estado == "success") {
            for (const literal of datos) {
            pokedex.push(new Pokemon(literal.id, literal.nombre, literal.tipo, literal.imagen));
            }
        }contenidoPokedex();
    }); 
}

function contenidoPokedex() {
    document.getElementById("151");
    for (const pokemon of pokedex) {
        let contenido = document.createElement('div');
        contenido.classList.add("pokemons");
        contenido.innerHTML = `<img class="pokedexImg" src="${pokemon.imagen}"> 
                                   <p class="pPokedex">${pokemon.nombre}</p>
                                   <p class="pPokedex">#${pokemon.id}</p>
                                   <p class="tipoPokedex">${pokemon.tipo}</p>
                                   <a href="#" id="${pokemon.id}" class="btnFav">Agregar a favoritos <i class="fas fa-heart"></i></a>`;
        document.getElementById("151").appendChild(contenido);
    }
}

function agregarFavoritos(e) {
    e.preventDefault();
    let band =true;
    const seleccionado = pokedex.find(pokemon => pokemon.id == this.id);

    if (localStorage.getItem('favoritos') !== null) {
        favoritos = JSON.parse(localStorage.getItem('favoritos'));
    }

    for(let i = 0 ; i< favoritos.length ;i++){
        if (favoritos[i].id === seleccionado.id) {
            band = false;
        }
    }

    if (band === true) {
        favoritos.push(seleccionado);
        Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado a favotitos!',
                showConfirmButton: false,
                timer: 1500
            })
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
}

function eliminarFavorito(e) {
    e.preventDefault();
    favoritos = favoritos.filter(pokemon => parseInt(pokemon.id) !== parseInt(e.target.id));
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    showFavs()
}
//--------------Perfil

const mostrarElegido = () => {
    if ("inicial" in localStorage) {
        const elegido = JSON.parse(localStorage.getItem("inicial"));

        for (const pokemon of elegido) {
            let resultado = document.createElement("div");
            resultado.classList.add("resultadoInicial");
            resultado.innerHTML = `<p class="pPerfil">Elegiste a: ${pokemon.nombre}</p>
                                        <img class="perfilImg" src="${pokemon.imagen}">
                                        <p><a href="inicial.html">Cambiar Inicial</a></p>`;

            document.getElementById("perfil").appendChild(resultado);

        }
    }
}

const mostrarPerfil = () => {
    if ("usuarios" in localStorage) {
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
        for (const usuarios of perfil) {
            perfil.push(new Usuario(usuarios.nombre, usuarios.apellido, usuarios.edad));
        }

        for (const usuarios of usuariosGuardados) {
            let usuario = document.createElement("div");
            usuario.classList.add("datos");
            usuario.innerHTML = `<p class="pPerfil">Nombre: ${usuarios.nombre}</p>
                                <p class="pPerfil">Apelllido: ${usuarios.apellido}</p>
                                <p class="pPerfil">Edad: ${usuarios.edad}</p>
                                `;
            document.getElementById("perfil").appendChild(usuario);
        }
    }
}

const showFavs = () => {
    if ("favoritos" in localStorage) {
        const favorito = JSON.parse(localStorage.getItem("favoritos"));
        const favs = document.getElementById("favs");
        favs.innerHTML = ''
        for (const pokemon of favorito) {
            let listaFavoritos = document.createElement("div");
            listaFavoritos.classList.add("pokemonFav");
            listaFavoritos.innerHTML = `<p class="pDatos">${pokemon.nombre}</p>
                                            <img class="perfilImg" src="${pokemon.imagen}">
                                            <p class="pDatos">#${pokemon.id}</p>
                                            <a href="#" id="${pokemon.id}" class="btnEliminar">Borrar</a>`;

            favs.appendChild(listaFavoritos);
        }
    }
    const btnEliminar = $(".btnEliminar");
    for (const boton of btnEliminar) {
        boton.onclick = eliminarFavorito;
    }
}
