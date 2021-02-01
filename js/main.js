// Variables
const objetoImg = document.querySelector('#imagen');
const botonAvanzar = document.querySelector('#avanzar');
const botonRetroceder = document.querySelector('#retroceder');
const templateCirculo = document.querySelector('#template-circulo').content.firstElementChild;
const circulos = document.querySelector('#circulos');
const botonParar  = document.querySelector('#parar');
const botonAutoPlay  = document.querySelector('#autoplay');
let intervalo = null;
const tiempoIntervaloSeg = 1;
const imagenes = ['img/foto1.jpg', 'img/foto2.jpg', 'img/foto3.jpg'];
let pagina = 1;

// Funciones

function activarAutoPlay() {
    //Si no existe
    if (intervalo === null) {
        intervalo = setInterval (avanzarFoto, tiempoIntervaloSeg * 1000);
    }
}

function cambiarPagina (nuevaPagina) {
    pagina = nuevaPagina;
    render();
}

function avanzarFoto () {
    pagina = pagina + 1;
    // Verificamos que no  hemos alcanzado el limite, en caso contrario lo restauramos a 1
    if (imagenes.length + 1 <= pagina) {
        pagina = 1;
    }
    render();
}

function retrocederFoto () {
    pagina = pagina - 1;
    // Comprobamos que no ha alcanzado el límite de 0, en caso contrario lo restauramos a la última
    if (0 === pagina) {
        pagina = imagenes.length;
    }
    render();
}

function render () {
    // Imagen
    objetoImg.setAttribute('src', imagenes[pagina - 1]);
    // Circulitos
    circulos.textContent = '';
    imagenes.forEach(function (imagen, indice) {
        // Creamos
        const nuevoCirculo = templateCirculo.cloneNode(true);
        // Anyadimos evento
        nuevoCirculo.addEventListener('click', function () {
            cambiarPagina(indice + 1);
        });
        // Marcamos el que coindice con la pagina
        if (pagina === indice + 1) {
            nuevoCirculo.setAttribute('checked', true);
        }
        // Mostramos
        circulos.appendChild(nuevoCirculo);
    });
}

// Eventos

botonAvanzar.addEventListener('click', avanzarFoto);
botonRetroceder.addEventListener('click', retrocederFoto);
botonAutoPlay.addEventListener('click', activarAutoPlay);
botonParar.addEventListener('click', desactivarAutoPlay);

// Inicio
render();