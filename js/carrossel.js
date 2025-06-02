// Declarar o array
let carrosselArr = [];

// Declaração dos itens do carrossel
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
    intervalo: 3000,
    itens: [],
    container: null,
    tituloContainer: null,
    intervalId: null,
    botoes: [],

    start: function (itens) {
        this.itens = itens;
        this.tituloContainer = document.querySelector(".titulo-carrossel");
        this.botoes = document.querySelectorAll('.controle-carrossel');

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
        const bg = document.querySelector(".background-carrossel");
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

// Imagens presentes no carrossel
let carrosselItens = [
    new CarrosselItem("img/ford-ranger-2024.jpg", "Nova Ford Ranger", "veiculos.html"),
    new CarrosselItem("img/ford-territory-2024.jpg", "Nova Ford Territory", "veiculos.html"),
    new CarrosselItem("img/ford-raptor-2024.jpg", "Nova Ford Raptor", "veiculos.html"),
];

// Iniciador do carrossel
window.addEventListener("DOMContentLoaded", () => {
    Carrossel.start(carrosselItens);
});



//Slider para direcionar a veiculos
class veiculosItens {
    constructor(imagem, link) {
        this.imagem = imagem;
        this.link = link;
    }
}

let veiculos = {
    index: 0,
    itens: [],
    container: null,
    botoes: [],

    start: function (itens) {
        this.itens = itens;
        this.container = document.querySelector(".lista-veiculos-slider");
        this.botoes = document.querySelectorAll(".controle-slider");

        //Configuração eventos para botão Slider
        this.botoes.forEach((botao, index) => {
            botao.addEventListener('click', () => {
                this.index = index;
                this.renderItem(this.index);
                this.atualizarBotoesAtivos();
            });
        });

        this.renderItem(this.index);
        this.atualizarBotoesAtivos();
    },

    renderItem: function (index) {
        const item = this.itens[index];
        if (!item) return;

        this.container.innerHTML = `
            <a href="${item.link}">
                <img src="${item.imagem}" alt="Veículo ${index + 1}">
            </a>
        `;
    },

    atualizarBotoesAtivos: function () {
        this.botoes.forEach((botao, i) => {
            botao.classList.toggle('ativo', i === this.index);
        });
    }
};

// Itens do carrossel usando a classe correta
let itensVeiculos = [
    new veiculosItens("img/ford-xl-cabine-veiculos.jpg", "veiculos.html"),
    new veiculosItens("img/ford-storm-veiculos.jpg", "veiculos.html"),
    new veiculosItens("img/ford-xls-diesel-veiculos.jpg", "veiculos.html"),
];

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
    veiculos.start(itensVeiculos);
});