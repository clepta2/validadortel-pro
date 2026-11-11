# 📞 ValidadorTel Pro

> **SDK & API Oficial de Validação Telefônica, Detecção ANATEL e ITU E.164 Internacional.**  
> Valida celulares (11 dígitos com nono dígito 9) e fixos (10 dígitos), mapeia 67 DDDs e Estados brasileiros, identifica números falsos/repetidos, formata padrão internacional E.164 e gera links diretos para WhatsApp na borda Anycast (<5ms).

[![npm version](https://img.shields.io/npm/v/validadortel-pro.svg)](https://www.npmjs.com/package/validadortel-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Edge Ready](https://img.shields.io/badge/Edge-Cloudflare%20Workers-orange.svg)](https://workers.cloudflare.com/)

---

## 🚀 Instalação (NPM)

```bash
npm install validadortel-pro
```

---

## ⚡ Uso Rápido (SDK em JavaScript / TypeScript)

```javascript
import { ValidadorTelPro } from 'validadortel-pro';

// 1. Validação de Celular com DDD (0ms em Memória RAM)
const resCelular = ValidadorTelPro.validar('(11) 98765-4321');

console.log(resCelular.valido);          // true
console.log(resCelular.tipo);            // "Móvel / Celular"
console.log(resCelular.uf);              // "SP"
console.log(resCelular.estado);          // "São Paulo (Região Metropolitana)"
console.log(resCelular.whatsappLink);    // "https://wa.me/5511987654321"
console.log(resCelular.e164);            // "+5511987654321"

// 2. Telefone Fixo Comercial
const resFixo = ValidadorTelPro.validar('(21) 2540-1234');
console.log(resFixo.tipo);               // "Fixo / Comercial"
console.log(resFixo.possuiWhatsapp);     // false

// 3. Detecção de Números Falsos / Chutes de Teclado
const resFake = ValidadorTelPro.validar('11111111111');
console.log(resFake.valido);             // false
console.log(resFake.motivo);             // "Número forjado com repetição excessiva do mesmo dígito"

// 4. Suporte a DDI Internacional (+1 EUA, +351 Portugal, +44 UK, +33 França, etc.)
const resInternacional = ValidadorTelPro.validar('+351 912 345 678');
console.log(resInternacional.pais.nome);        // "Portugal"
console.log(resInternacional.pais.flag);        // "🇵🇹"
console.log(resInternacional.operadora);        // "Vodafone Portugal"
console.log(resInternacional.comunicacao.aceitaSms); // true
console.log(resInternacional.whatsappLink);    // "https://wa.me/351912345678"
```

---

## 🌐 Endpoint Público Anycast Edge

* **Endpoint Cloudflare:** `GET https://validadortel-pro-api.diffstoregja2.workers.dev/api/validar-telefone?telefone=...`
* **Cluster:** Cloudflare Anycast (`diffstoregja2.workers.dev`)
* **Latência:** `<5ms`
* **Formatos Aceitos:** `GET` ou `POST` (JSON)

### Exemplo via cURL:
```bash
curl -X GET "https://validadortel-pro-api.diffstoregja2.workers.dev/api/validar-telefone?telefone=11987654321"
```

### Exemplo de Resposta JSON:
```json
{
  "ok": true,
  "valido": true,
  "tipo": "Móvel / Celular",
  "ehCelular": true,
  "ehFixo": false,
  "possuiWhatsapp": true,
  "pais": {
    "codigo": "BR",
    "nome": "Brasil",
    "ddi": "55",
    "flag": "🇧🇷"
  },
  "ddd": "11",
  "uf": "SP",
  "estado": "São Paulo (Região Metropolitana)",
  "regiao": "Sudeste",
  "numeroNacional": "11987654321",
  "numeroFormatado": "(11) 98765-4321",
  "internacionalFormatado": "+55 (11) 98765-4321",
  "e164": "+5511987654321",
  "e164Limpo": "5511987654321",
  "whatsappLink": "https://wa.me/5511987654321",
  "orgaoRegulador": "ANATEL (Agência Nacional de Telecomunicações)",
  "edge": "diffstoregja2.workers.dev"
}
```

---

## 📄 Licença

Distribuído sob licença MIT. Veja `LICENSE` para mais detalhes.

Copyright (c) 2026 clepta2
