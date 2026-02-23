// script.js
console.log("Jogo iniciado");

let quantidadeEquipes = 0;

let rodada = 1;
let tempo = 90;
let intervalo = null;

let ultimoDado = null;
let ultimaCategoria = null;

// ===== Utils =====
function atualizarRodada() {
  const el = document.getElementById("numero-rodada");
  if (el) el.textContent = String(rodada);
}

function resetarSorteioUI() {
  document.getElementById("resultado-dado").textContent = "🎲";
  document.getElementById("resultado-categoria").textContent = "?";
  ultimoDado = null;
  ultimaCategoria = null;
}

function pararTimer() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }
}

// ===== Controle de telas =====
function irPara(telaID) {
  // se estiver saindo do timer, pare o intervalo
  const timerAtivo = document.getElementById("tela-timer")?.classList.contains("ativa");
  if (timerAtivo && telaID !== "tela-timer") {
    pararTimer();
  }

  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(telaID).classList.add("ativa");

  // hooks simples por tela
  if (telaID === "tela-dado") {
    atualizarRodada();
  }
  if (telaID === "tela-timer") {
    // ao entrar no timer, esconde o botão de próxima rodada
    const btn = document.getElementById("btn-proxima-rodada");
    if (btn) btn.style.display = "none";
  }
}

// ===== Escolha de equipes =====
function selecionarEquipes(qtd) {
  quantidadeEquipes = qtd;
  document.getElementById("qtd-equipes").textContent = String(qtd);

  // ao iniciar jogo, volta rodada pra 1 e limpa sorteio
  rodada = 1;
  atualizarRodada();
  resetarSorteioUI();

  irPara("tela-dado");
}

// ===== Rolar dado + categoria =====
function rolarDado() {
  const numeroDado = Math.floor(Math.random() * 6) + 1;
  ultimoDado = numeroDado;
  document.getElementById("resultado-dado").textContent = String(numeroDado);

  const categorias = ["Objetos", "Pessoas"];
  const categoriaSorteada = categorias[Math.floor(Math.random() * categorias.length)];
  ultimaCategoria = categoriaSorteada;
  document.getElementById("resultado-categoria").textContent = categoriaSorteada;
}

// ===== Timer =====
function iniciarTimer() {
  // opcional: só deixa iniciar se rolou dado
  if (!ultimoDado || !ultimaCategoria) {
    // se não quiser alerta, pode remover
    alert("Role o dado antes de iniciar o tempo.");
    return;
  }

  tempo = 90;
  irPara("tela-timer");

  const contador = document.getElementById("contador");
  contador.textContent = String(tempo);

  pararTimer();

  intervalo = setInterval(() => {
    tempo--;
    contador.textContent = String(tempo);

    if (tempo <= 0) {
      pararTimer();
      contador.textContent = "Fim!";

      // mostra botão de próxima rodada quando acabar
      const btn = document.getElementById("btn-proxima-rodada");
      if (btn) btn.style.display = "inline-block";
    }
  }, 1000);
}

// ===== Próxima Rodada =====
function proximaRodada() {
  pararTimer();
  rodada++;
  atualizarRodada();
  resetarSorteioUI();
  irPara("tela-dado");
}

// inicializa
atualizarRodada();
