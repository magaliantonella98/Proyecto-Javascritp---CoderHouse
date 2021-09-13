$(document).ready(function (e) {
    const btnFav = $(".btnFav");
    for (const boton of btnFav) {
    boton.onclick=agregarFavoritos
}
});
Pokedex();