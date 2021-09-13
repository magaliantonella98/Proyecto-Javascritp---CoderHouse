$(document).ready(function () {
const botones = $(".btnElegir");
for (const boton of botones) {
    boton.onclick=elegirInicial;
}
});

animarPokebola();
Iniciales();