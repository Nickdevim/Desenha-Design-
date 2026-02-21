console.log("Jogo iniciado");

let quantidadeEquipes = 0;
let tempo = 90;
let intervalo;

// Controle de telas
function irPara(telaID) {
    document.querySelectorAll('.tela').forEach(t =>
        t.classList.remove('ativa')
    );
    document.getElementById(telaID).classList.add('ativa');
}

// Escolha de equipes
function selecionarEquipes(qtd) {
    quantidadeEquipes = qtd;
    document.getElementById("qtd-equipes").textContent = qtd;
    irPara('tela-dado');
}

// Rolar dado + categoria
function rolarDado() {
    const numeroDado = Math.floor(Math.random() * 6) + 1;
    document.getElementById("resultado-dado").textContent = numeroDado;

    const categorias = ["Objetos", "Pessoas"];
    const categoriaSorteada =
        categorias[Math.floor(Math.random() * categorias.length)];

    document.getElementById("resultado-categoria").textContent = categoriaSorteada;
}

// Timer
function iniciarTimer() {
    tempo = 90;

    irPara('tela-timer');

    document.getElementById("contador").textContent = tempo;

    intervalo = setInterval(() => {
        tempo--;
        document.getElementById("contador").textContent = tempo;

        if (tempo <= 0) {
            clearInterval(intervalo);
            document.getElementById("contador").textContent = "Fim!";
        }
    }, 1000);
}
