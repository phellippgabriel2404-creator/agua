const agua1 = document.getElementById("agua1");
const agua2 = document.getElementById("agua2");
const detalhes = document.getElementById("detalhes");
const btnIniciar = document.getElementById("btnIniciar");
const btnReiniciar = document.getElementById("btnReiniciar");

let nivel1 = 100;
let nivel2 = 0;
let simulacao = null;

// Atualiza visual
function atualizarInterface() {
  agua1.style.height = `${nivel1}%`;
  agua2.style.height = `${nivel2}%`;
  detalhes.innerText = `Tanque 1: ${nivel1.toFixed(1)}% | Tanque 2: ${nivel2.toFixed(1)}%`;
}

// Função que tenta chamar o backend
async function chamarBackend(url) {
  try {
    const resp = await fetch(url, { method: "POST" });
    if (resp.ok) {
      const dados = await resp.json();
      if (dados && dados.length === 2) {
        nivel1 = dados[0].nivel;
        nivel2 = dados[1].nivel;
      }
      return true;
    }
  } catch {
    // Se falhar, usamos modo local
    return false;
  }
  return false;
}

// Simula localmente se o backend não responder
function simularLocal() {
  if (nivel1 > 0) nivel1 -= 2;
  if (nivel2 < 100) nivel2 += 2;
  atualizarInterface();
}

// Iniciar simulação
async function iniciarSimulacao() {
  if (simulacao) return; // evita duplicar
  simulacao = setInterval(async () => {
    const ok = await chamarBackend("/api/simular");
    if (!ok) simularLocal();
  }, 700);
}

// Reiniciar
async function reiniciarSimulacao() {
  clearInterval(simulacao);
  simulacao = null;
  const ok = await chamarBackend("/api/reiniciar");
  if (!ok) {
    nivel1 = 100;
    nivel2 = 0;
  }
  atualizarInterface();
}

// Eventos dos botões
btnIniciar.addEventListener("click", iniciarSimulacao);
btnReiniciar.addEventListener("click", reiniciarSimulacao);

// Inicializa ao carregar
document.addEventListener("DOMContentLoaded", atualizarInterface);
