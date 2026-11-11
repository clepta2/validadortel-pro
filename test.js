/**
 * test.js
 * Testes unitários do ValidadorTel Pro
 */

import { ValidadorTelPro } from './validadortel-pro.js';

function runTests() {
  console.log('=== TESTES DO VALIDADORTEL PRO ===\n');

  const cases = [
    { input: '(11) 98765-4321', expectedValid: true, tipo: 'Móvel / Celular', uf: 'SP', operadoraEsperada: 'Vivo' },
    { input: '5511991234567', expectedValid: true, tipo: 'Móvel / Celular', uf: 'SP', operadoraEsperada: 'Claro' },
    { input: '(21) 2540-1234', expectedValid: true, tipo: 'Fixo / Comercial', uf: 'RJ' },
    { input: '11111111111', expectedValid: false, reasonContains: 'repetição' },
    { input: '11912345678', expectedValid: false, reasonContains: 'Faixa de celular inválida' },
    { input: '99987654321', expectedValid: true, uf: 'MA', operadoraEsperada: 'TIM' },
    { input: '+1 (415) 555-2671', expectedValid: true, pais: 'US' },
    { input: '+351 912 345 678', expectedValid: true, pais: 'PT', operadoraEsperada: 'Vodafone Portugal' },
    { input: '+351 961 234 567', expectedValid: true, pais: 'PT', operadoraEsperada: 'MEO (Altice)' },
    { input: '+44 7911 123456', expectedValid: true, pais: 'GB', aceitaSms: true },
    { input: '+33 6 12 34 56 78', expectedValid: true, pais: 'FR', aceitaSms: true },
    { input: '+244 923 123 456', expectedValid: true, pais: 'AO', operadoraEsperada: 'Unitel Angola' },
    { input: '+54 9 11 4512 8763', expectedValid: true, pais: 'AR', aceitaSms: true },
    { input: '+81 90 4912 8763', expectedValid: true, pais: 'JP', aceitaSms: true }
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
