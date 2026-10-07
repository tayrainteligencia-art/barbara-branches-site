// Regras do formulário de pré-agendamento — funções puras, sem dependências,
// testadas em scripts/test-validacao-agendamento.mjs.

export const PROCEDIMENTO = "Avaliação";

export type Resultado<T> = { ok: true; valor: T } | { ok: false; erro: string };

function somenteDigitos(texto: string) {
  return texto.replace(/\D/g, "");
}

// ---------------------------------------------------------------- Nome

export function normalizarNome(texto: string) {
  return texto.trim().replace(/\s+/g, " ");
}

// Cada parte: letras (com acento), podendo ser unidas por apóstrofo ou hífen
// — "D'Ávila", "Ana-Clara". Sem dígitos nem outros símbolos.
const PARTE_NOME = /^\p{L}+(?:['’-]\p{L}+)*$/u;

export function validarNome(texto: string): Resultado<string> {
  const nome = normalizarNome(texto);
  if (!nome) return { ok: false, erro: "Informe seu nome completo." };
  if (/\d/.test(nome)) return { ok: false, erro: "O nome não pode ter números." };
  if (nome.length < 3 || nome.length > 80) {
    return { ok: false, erro: "O nome deve ter entre 3 e 80 caracteres." };
  }
  const partes = nome.split(" ");
  if (!partes.every((p) => PARTE_NOME.test(p))) {
    return {
      ok: false,
      erro: "Use apenas letras, espaços, apóstrofo ou hífen no nome.",
    };
  }
  if (partes.length < 2) return { ok: false, erro: "Informe nome e sobrenome." };
  return { ok: true, valor: nome };
}

// ---------------------------------------------------------------- Telefone

/**
 * Reduz o que foi digitado/colado a no máximo 11 dígitos (DDD + número).
 * Remove o código do país quando vier com "+55" ou com dígitos além do
 * tamanho de um número nacional — "55" sozinho no início pode ser o DDD 55.
 */
export function normalizarTelefone(texto: string) {
  let digitos = somenteDigitos(texto);
  const temCodigoPais = texto.trim().startsWith("+") || digitos.length > 11;
  if (temCodigoPais && digitos.startsWith("55")) digitos = digitos.slice(2);
  return digitos.slice(0, 11);
}

/** Máscara progressiva: (91) 3245-3397 (fixo) ou (91) 98888-7777 (celular). */
export function formatarTelefone(digitos: string) {
  const d = somenteDigitos(digitos).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const corte = d.length === 11 ? 5 : 4;
  if (resto.length <= corte) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

export function validarTelefone(texto: string): Resultado<string> {
  const d = normalizarTelefone(texto);
  if (!d) return { ok: false, erro: "Informe seu número de telefone ou WhatsApp." };
  if (d.length !== 10 && d.length !== 11) {
    return {
      ok: false,
      erro: "Número incompleto. Informe DDD + número, ex.: (91) 98888-7777.",
    };
  }
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99) return { ok: false, erro: "DDD inválido." };
  if (d.length === 11 && d[2] !== "9") {
    return { ok: false, erro: "Celular com 11 dígitos deve começar com 9 após o DDD." };
  }
  // Fixo: começa com 2 a 5. Um número de 10 dígitos começando com 6–9 é um
  // celular sem o nono dígito, formato que não existe mais.
  if (d.length === 10 && !/[2-5]/.test(d[2])) {
    return { ok: false, erro: "Para celular, inclua o 9 após o DDD." };
  }
  return { ok: true, valor: d };
}

// ---------------------------------------------------------------- CPF

export function normalizarCpf(texto: string) {
  return somenteDigitos(texto).slice(0, 11);
}

/** Máscara progressiva: 000.000.000-00 */
export function formatarCpf(digitos: string) {
  const d = normalizarCpf(digitos);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/** Dígito verificador do CPF para os primeiros `base.length` dígitos (9 ou 10). */
export function digitoVerificadorCpf(base: string) {
  let soma = 0;
  for (let i = 0; i < base.length; i++) {
    soma += Number(base[i]) * (base.length + 1 - i);
  }
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

export function validarCpf(texto: string): Resultado<string> {
  const d = somenteDigitos(texto);
  if (!d) return { ok: false, erro: "Informe seu CPF." };
  if (d.length !== 11) return { ok: false, erro: "O CPF deve ter 11 dígitos." };
  if (/^(\d)\1{10}$/.test(d)) return { ok: false, erro: "CPF inválido." };
  const dv1 = digitoVerificadorCpf(d.slice(0, 9));
  const dv2 = digitoVerificadorCpf(d.slice(0, 10));
  if (dv1 !== Number(d[9]) || dv2 !== Number(d[10])) {
    return { ok: false, erro: "CPF inválido. Confira os números digitados." };
  }
  return { ok: true, valor: d };
}

// ---------------------------------------------------------------- Disponibilidade

// TODO: restringir dias/turnos ao horário de funcionamento da clínica quando
// ele for confirmado (pendência em PENDENCIAS.md). Hoje não há validação
// contra horário — a equipe confirma o horário pelo WhatsApp.
export const DIAS = [
  { id: "seg", curto: "Seg", nome: "Segunda" },
  { id: "ter", curto: "Ter", nome: "Terça" },
  { id: "qua", curto: "Qua", nome: "Quarta" },
  { id: "qui", curto: "Qui", nome: "Quinta" },
  { id: "sex", curto: "Sex", nome: "Sexta" },
  { id: "sab", curto: "Sáb", nome: "Sábado" },
] as const;

export const TURNOS = [
  { id: "manha", nome: "manhã" },
  { id: "tarde", nome: "tarde" },
] as const;

export type DiaId = (typeof DIAS)[number]["id"];
export type TurnoId = (typeof TURNOS)[number]["id"];
export type Disponibilidade = { dias: DiaId[]; turnos: TurnoId[] };

export function validarDisponibilidade(d: Disponibilidade): Resultado<Disponibilidade> {
  if (d.dias.length === 0 && d.turnos.length === 0) {
    return { ok: false, erro: "Escolha pelo menos um dia e um turno." };
  }
  if (d.dias.length === 0) return { ok: false, erro: "Escolha pelo menos um dia." };
  if (d.turnos.length === 0) return { ok: false, erro: "Escolha pelo menos um turno." };
  return { ok: true, valor: d };
}

/** "Seg, Qua, Sex (manhã e tarde)" — dias na ordem da semana, turnos por extenso. */
export function formatarDisponibilidade(d: Disponibilidade) {
  const dias = DIAS.filter((dia) => d.dias.includes(dia.id)).map((dia) => dia.curto);
  const turnos = TURNOS.filter((t) => d.turnos.includes(t.id)).map((t) => t.nome);
  return `${dias.join(", ")} (${turnos.join(" e ")})`;
}

// ---------------------------------------------------------------- Mensagem

export type DadosPreAgendamento = {
  nome: string;
  telefone: string;
  cpf: string;
  disponibilidade: Disponibilidade;
};

/** Texto puro enviado pelo WhatsApp — uma informação por linha, sem emojis. */
export function montarMensagem(dados: DadosPreAgendamento) {
  return [
    "Olá! Quero solicitar um pré-agendamento.",
    "",
    `Nome: ${dados.nome}`,
    `Telefone: ${formatarTelefone(dados.telefone)}`,
    `CPF: ${formatarCpf(dados.cpf)}`,
    `Procedimento: ${PROCEDIMENTO}`,
    `Disponibilidade: ${formatarDisponibilidade(dados.disponibilidade)}`,
  ].join("\n");
}
