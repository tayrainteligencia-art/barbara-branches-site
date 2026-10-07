// Uso: npm run test:validacao  (node --test, sem dependências; o Node remove
// os tipos do .ts sozinho a partir da v23.6)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validarNome,
  normalizarTelefone,
  formatarTelefone,
  validarTelefone,
  formatarCpf,
  validarCpf,
  digitoVerificadorCpf,
  validarDisponibilidade,
  formatarDisponibilidade,
  montarMensagem,
} from "../src/lib/validacao-agendamento.ts";

// CPFs fictícios gerados pelo próprio algoritmo — nunca usar CPF real.
function gerarCpf(base9) {
  const dv1 = digitoVerificadorCpf(base9);
  const dv2 = digitoVerificadorCpf(base9 + dv1);
  return `${base9}${dv1}${dv2}`;
}

test("nome: aceita nome e sobrenome, acentos, apóstrofo e hífen", () => {
  assert.deepEqual(validarNome("Maria da Silva"), { ok: true, valor: "Maria da Silva" });
  assert.deepEqual(validarNome("  João   Pereira  "), { ok: true, valor: "João Pereira" });
  assert.equal(validarNome("Ana D'Ávila").ok, true);
  assert.equal(validarNome("Ana-Clara Souza").ok, true);
  assert.equal(validarNome("Lú Sá").ok, true);
});

test("nome: recusa vazio, uma palavra, dígitos, símbolos e tamanho fora do limite", () => {
  assert.equal(validarNome("").ok, false);
  assert.equal(validarNome("   ").ok, false);
  assert.equal(validarNome("Maria").ok, false);
  assert.equal(validarNome("Maria 2 Silva").ok, false);
  assert.equal(validarNome("Maria @ Silva").ok, false);
  assert.equal(validarNome("Maria - Silva").ok, false);
  assert.equal(validarNome(`Maria ${"a".repeat(80)}`).ok, false);
  assert.equal(validarNome(`Maria ${"a".repeat(74)}`).ok, true); // exatamente 80
});

test("telefone: normaliza e remove +55", () => {
  assert.equal(normalizarTelefone("+55 (91) 98888-7777"), "91988887777");
  assert.equal(normalizarTelefone("5591988887777"), "91988887777");
  assert.equal(normalizarTelefone("+55 91 3245-3397"), "9132453397");
  // DDD 55 sem código do país não pode perder os dígitos
  assert.equal(normalizarTelefone("(55) 99999-8888"), "55999998888");
  assert.equal(normalizarTelefone("(91) 98888-77779999"), "91988887777");
});

test("telefone: máscara progressiva", () => {
  assert.equal(formatarTelefone(""), "");
  assert.equal(formatarTelefone("9"), "(9");
  assert.equal(formatarTelefone("91"), "(91");
  assert.equal(formatarTelefone("919"), "(91) 9");
  assert.equal(formatarTelefone("9132453397"), "(91) 3245-3397");
  assert.equal(formatarTelefone("91988887777"), "(91) 98888-7777");
});

test("telefone: aceita fixo e celular, com e sem +55", () => {
  assert.deepEqual(validarTelefone("(91) 98888-7777"), { ok: true, valor: "91988887777" });
  assert.deepEqual(validarTelefone("+55 91 98888-7777"), { ok: true, valor: "91988887777" });
  assert.deepEqual(validarTelefone("(91) 3245-3397"), { ok: true, valor: "9132453397" });
  assert.deepEqual(validarTelefone("+559132453397"), { ok: true, valor: "9132453397" });
  assert.equal(validarTelefone("(11) 91234-5678").ok, true);
  assert.equal(validarTelefone("(99) 91234-5678").ok, true);
});

test("telefone: recusa DDD inválido, tamanho errado e celular sem 9", () => {
  assert.equal(validarTelefone("").ok, false);
  assert.equal(validarTelefone("(91) 9888-777").ok, false);
  assert.equal(validarTelefone("(01) 98888-7777").ok, false);
  assert.equal(validarTelefone("(10) 98888-7777").ok, false);
  assert.equal(validarTelefone("(91) 88888-7777").ok, false);
  assert.equal(validarTelefone("(91) 8888-7777").ok, false);
});

test("CPF: máscara progressiva", () => {
  assert.equal(formatarCpf("123"), "123");
  assert.equal(formatarCpf("1234"), "123.4");
  assert.equal(formatarCpf("1234567"), "123.456.7");
  assert.equal(formatarCpf("1234567890"), "123.456.789-0");
  assert.equal(formatarCpf("123456789012345"), "123.456.789-01");
});

test("CPF: aceita fictícios gerados pelo algoritmo, com e sem máscara", () => {
  for (const base of ["390533447", "000000001", "987654321", "529982247"]) {
    const cpf = gerarCpf(base);
    assert.deepEqual(validarCpf(cpf), { ok: true, valor: cpf });
    assert.equal(validarCpf(formatarCpf(cpf)).ok, true);
  }
});

test("CPF: recusa dígito verificador errado, repetidos e tamanho errado", () => {
  const cpf = gerarCpf("390533447");
  const dv2Errado = cpf.slice(0, 10) + String((Number(cpf[10]) + 1) % 10);
  const dv1Errado = cpf.slice(0, 9) + String((Number(cpf[9]) + 1) % 10) + cpf[10];
  assert.equal(validarCpf(dv1Errado).ok, false);
  assert.equal(validarCpf(dv2Errado).ok, false);
  for (let n = 0; n <= 9; n++) {
    assert.equal(validarCpf(String(n).repeat(11)).ok, false, `${n} repetido`);
  }
  assert.equal(validarCpf("111.111.111-11").ok, false);
  assert.equal(validarCpf("").ok, false);
  assert.equal(validarCpf(cpf.slice(0, 10)).ok, false);
});

test("disponibilidade: exige ao menos 1 dia e 1 turno", () => {
  assert.equal(validarDisponibilidade({ dias: [], turnos: [] }).ok, false);
  assert.equal(validarDisponibilidade({ dias: ["seg"], turnos: [] }).ok, false);
  assert.equal(validarDisponibilidade({ dias: [], turnos: ["manha"] }).ok, false);
  assert.equal(validarDisponibilidade({ dias: ["seg"], turnos: ["manha"] }).ok, true);
});

test("disponibilidade: dias na ordem da semana, turnos por extenso", () => {
  assert.equal(
    formatarDisponibilidade({ dias: ["sex", "seg", "qua"], turnos: ["tarde", "manha"] }),
    "Seg, Qua, Sex (manhã e tarde)",
  );
  assert.equal(formatarDisponibilidade({ dias: ["sab"], turnos: ["tarde"] }), "Sáb (tarde)");
});

test("montarMensagem: igual ao exemplo do briefing", () => {
  const esperado = [
    "Olá! Quero solicitar um pré-agendamento.",
    "",
    "Nome: Maria da Silva",
    "Telefone: (91) 98888-7777",
    "CPF: 123.456.789-09",
    "Procedimento: Avaliação",
    "Disponibilidade: Seg, Qua, Sex (manhã e tarde)",
  ].join("\n");
  // Exemplo literal do briefing — aqui só testa a formatação, não a validade do CPF.
  const mensagem = montarMensagem({
    nome: "Maria da Silva",
    telefone: "91988887777",
    cpf: "12345678909",
    disponibilidade: { dias: ["sex", "qua", "seg"], turnos: ["manha", "tarde"] },
  });
  assert.equal(mensagem, esperado);
  assert.doesNotMatch(mensagem, /\p{Extended_Pictographic}/u);
});
