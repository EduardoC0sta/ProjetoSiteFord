// Declarar o array
let CarrosselArr = [];

// Declaração dos itens do carrosel
class CarrosselItem {
    constructor(imagem, titulo, link, alinhamento = 'right') {
        this.imagem = imagem;
        this.titulo = titulo;
        this.link = link;
        this.alinhamento = alinhamento;
    }
}

// Objeto responsável pelo carrossel
let Carrossel = {
    index: 0,
    intervalo: 3000,
    itens: [],
    container: null,
    tituloContainer: null,
    intervalId: null,
    botoes: [],

    start: function (itens) {
        this.itens = itens;
        this.tituloContainer = document.querySelector(".titulo_carrossel");
        this.botoes = document.querySelectorAll('.controle_carrossel');

        // Configurar eventos para os botões
        this.botoes.forEach((botao, index) => {
            botao.addEventListener('click', () => {
                this.index = index;
                this.renderItem(this.index);
                this.resetInterval();
                this.atualizarBotoesAtivos();
            });
        });

        this.renderItem(this.index);
        this.atualizarBotoesAtivos();
        this.startInterval();
    },

    startInterval: function () {
        this.intervalId = setInterval(() => {
            this.index = (this.index + 1) % this.itens.length;
            this.renderItem(this.index);
            this.atualizarBotoesAtivos();
        }, this.intervalo);
    },

    resetInterval: function () {
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
    },

    atualizarBotoesAtivos: function () {
        this.botoes.forEach((botao, i) => {
            botao.classList.toggle('ativo', i === this.index);
        });
    }
};

// Imagens presentes no carrossel.
let carrosselArr = [
    new CarrosselItem("img/ford-ranger-2024.jpg", "Nova Ford Ranger", "veiculos.html"),
    new CarrosselItem("img/ford-territory-2024.jpg", "Nova Ford Territory", "veiculos.html"),
    new CarrosselItem("img/ford-raptor.jpg", "Nova Ford Raptor", "veiculos.html"),
    new CarrosselItem("img/celso.jpg", "Celso", "veiculos.html"),
];

// Iniciador do carrossel.
window.addEventListener("DOMContentLoaded", () => {
    Carrossel.start(carrosselArr);
});