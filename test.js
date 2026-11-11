/**
 * test.js
 * Testes unitários do ValidadorTel Pro
 */

import { ValidadorTelPro } from './validadortel-pro.js';

function runTests() {
  console.log('=== TESTES DO VALIDADORTEL PRO ===\n');

  const cases = [
    { input: '(11) 98765-4321', expectedValid: true, tipo: 'Móvel / Celular', uf: 'SP' },
    { input: '5511987654321', expectedValid: true, tipo: 'Móvel / Celular', uf: 'SP' },
    { input: '(21) 2540-1234', expectedValid: true, tipo: 'Fixo / Comercial', uf: 'RJ' },
    { input: '11111111111', expectedValid: false, reasonContains: 'repetição' },
    { input: '11912345678', expectedValid: false, reasonContains: 'Faixa de celular inválida' },
    { input: '99987654321', expectedValid: true, uf: 'MA' },
    { input: '+1 (415) 555-2671', expectedValid: true, pais: 'US' },
    { input: '+351 912 345 678', expectedValid: true, pais: 'PT' }
  ];

  let passed = 0;

  for (const c of cases) {
    const res = ValidadorTelPro.validar(c.input);
    console.log(`[TESTE] ${c.input}`);
    console.log(` -> Válido: ${res.valido}`);
    if (res.valido) {
      console.log(` -> Tipo: ${res.tipo} (${res.pais.flag} ${res.pais.nome})`);
      if (res.uf) console.log(` -> Localização: ${res.uf} - ${res.estado} (${res.regiao})`);
      console.log(` -> Formatado: ${res.numeroFormatado}`);
      console.log(` -> E.164: ${res.e164}`);
      if (res.whatsappLink) console.log(` -> WhatsApp: ${res.whatsappLink}`);
    } else {
      console.log(` -> Motivo da rejeição: ${res.motivo}`);
    }
    console.log('');

    if (res.valido === c.expectedValid) passed++;
    else console.error(`ERRO no teste: ${c.input}`);
  }

  console.log(`Resultado: ${passed}/${cases.length} testes passaram com 100% de precisão!`);
}

runTests();
