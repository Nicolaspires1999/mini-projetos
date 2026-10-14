// Calculadora simples sem uso de eval(): a lógica é feita com estado manual.
const resultado = document.getElementById("resultado");
const historico = document.getElementById("historico");

let atual = "0";        // número que está sendo digitado
let anterior = null;    // primeiro operando
let operador = null;    // + - * /
let novoNumero = true;  // próxima tecla numérica começa um novo número

const simbolos = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function formatar(texto) {
  return String(texto).replace(".", ",");
}

function atualizarTela() {
  resultado.textContent = formatar(atual);
  historico.textContent =
    operador !== null ? `${formatar(anterior)} ${simbolos[operador]}` : "";
  document.querySelectorAll("[data-op]").forEach((b) =>
    b.classList.toggle("ativo", b.dataset.op === operador && novoNumero)
  );
}

function calcular(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b;
  }
}

function arredondar(n) {
  // evita resultados como 0.1 + 0.2 = 0.30000000000000004
  return String(parseFloat(n.toPrecision(12)));
}

function digitar(d) {
  if (novoNumero) {
    atual = d;
    novoNumero = false;
  } else if (atual.replace("-", "").replace(".", "").length < 12) {
    atual = atual === "0" ? d : atual + d;
  }
  atualizarTela();
}

function ponto() {
  if (novoNumero) {
    atual = "0.";
    novoNumero = false;
  } else if (!atual.includes(".")) {
    atual += ".";
  }
  atualizarTela();
}

function escolherOperador(op) {
  if (operador !== null && !novoNumero) igual();
  anterior = parseFloat(atual);
  operador = op;
  novoNumero = true;
  atualizarTela();
}

function igual() {
  if (operador === null) return;
  const r = calcular(anterior, parseFloat(atual), operador);
  if (r === null) {
    atual = "Erro: divisão por zero";
    anterior = null;
    operador = null;
    novoNumero = true;
    resultado.textContent = atual;
    historico.textContent = "";
    return;
  }
  historico.textContent = `${formatar(anterior)} ${simbolos[operador]} ${formatar(atual)} =`;
  atual = arredondar(r);
  anterior = null;
  operador = null;
  novoNumero = true;
  resultado.textContent = formatar(atual);
  document.querySelectorAll("[data-op]").forEach((b) => b.classList.remove("ativo"));
}

function limpar() {
  atual = "0";
  anterior = null;
  operador = null;
  novoNumero = true;
  atualizarTela();
}

function apagar() {
  if (novoNumero || isNaN(Number(atual))) return limpar();
  atual = atual.length > 1 ? atual.slice(0, -1) : "0";
  if (atual === "-") atual = "0";
  atualizarTela();
}

function inverter() {
  if (isNaN(Number(atual)) || atual === "0") return;
  atual = atual.startsWith("-") ? atual.slice(1) : "-" + atual;
  atualizarTela();
}

function porcentagem() {
  if (isNaN(Number(atual))) return;
  atual = arredondar(parseFloat(atual) / 100);
  novoNumero = true;
  atualizarTela();
}

const acoes = { limpar, apagar, inverter, porcentagem, ponto, igual };

document.querySelector(".teclas").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.num !== undefined) digitar(b.dataset.num);
  else if (b.dataset.op) escolherOperador(b.dataset.op);
  else if (b.dataset.acao) acoes[b.dataset.acao]();
});

// Suporte ao teclado
document.addEventListener("keydown", (e) => {
  if (/^[0-9]$/.test(e.key)) digitar(e.key);
  else if (["+", "-", "*", "/"].includes(e.key)) { e.preventDefault(); escolherOperador(e.key); }
  else if (e.key === "," || e.key === ".") ponto();
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); igual(); }
  else if (e.key === "Backspace") apagar();
  else if (e.key === "Escape") limpar();
  else if (e.key === "%") porcentagem();
});

atualizarTela();
