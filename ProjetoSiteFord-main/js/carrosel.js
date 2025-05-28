// Declarar o array
let CarrosselArr = [];

// Declaração dos itens do carrosel
class CarrosselItem {
    constructor(imagem, titulo, link) {
        this.imagem = imagem;
        this.titulo = titulo;
        this.link = link;
    }
}

// Objeto responsável pelo carrossel
let Carrossel = {
    index: 0,
    intervalo: 2000,
    itens: [],
    container: null,
    tituloContainer: null,
    intervalId: null,
    radioButtons: [],

    start: function (itens) {
        this.itens = itens;
        this.tituloContainer = document.querySelector(".titulo_carrossel");
        this.radioButtons = document.querySelectorAll('input[name="botao_carrossel"]');

        // Configurar eventos para os botões de rádio
        this.radioButtons.forEach((radio, index) => {
            radio.addEventListener('change', ( ) => {
                if (radio.checked) {
                    this.index = index;
                    this.renderItem(this.index);
                    this.resetInterval();
                }
            });
        });

        this.renderItem(this.index);
        this.startInterval();
    },

    startInterval: function() {
        this.intervalId = setInterval(() => {
            this.index = (this.index + 1) % this.itens.length;
            this.radioButtons[this.index].checked = true;
            this.renderItem(this.index);
        }, this.intervalo);
    },

    resetInterval: function() {
        clearInterval(this.intervalId);
        this.startInterval();
    },

    renderItem: function (index) {
        this.tituloContainer.innerHTML = "";

        const item = this.itens[index];

        const p = document.createElement("p");
        p.textContent = item.titulo;
        this.tituloContainer.appendChild(p);

        // Atualiza o background da div
        const bg = document.querySelector(".background_carrossel");
        bg.style.backgroundImage = `url('${item.imagem}')`;
        bg.style.backgroundSize = "cover";
        bg.style.backgroundPosition = "center";
    }
};

// Imagens presentes no carrossel.
let carrosselArr = [
    new CarrosselItem("img/ford-ranger-2024.jpg", "Nova Ford Ranger", "veiculos.html"),
    new CarrosselItem("img/ford-territory-2024.jpg", "Nova Ford Territory", "veiculos.html"),
    new CarrosselItem("img/ford-raptor.jpg", "Nova Ford Raptor", "veiculos.html"),
    new CarrosselItem("img/celso.jpg", "Celso", "veiculos.html")
];

// Iniciador do carrossel.
window.addEventListener("DOMContentLoaded", () => {
    Carrossel.start(carrosselArr);
});