# 📞 ValidadorTel Pro

> **Documentação Oficial da API & SDK de Integração Telefônica (ANATEL & ITU E.164).**  
> 🔒 **Atenção:** Este repositório destina-se exclusivamente à visualização de documentação técnica e integração do cliente SDK. O serviço de API em nuvem é operado através do nosso **[Ponte APIs Marketplace](https://ponte.ozpro.com.br)**. O acesso aos endpoints na borda requer obrigatoriamente uma **Chave de API (`x-api-key`)** ativa.

[![Status](https://img.shields.io/badge/Status-Cloudflare%20Edge%20API-success.svg)](#)
[![CI/CD Tests](https://github.com/clepta2/validadortel-pro/actions/workflows/test.yml/badge.svg)](https://github.com/clepta2/validadortel-pro/actions)
[![Padrão](https://img.shields.io/badge/Padrão-ANATEL%20%26%20ITU%20E.164-blue.svg)](#)
[![Autenticação](https://img.shields.io/badge/Autenticação-x--api--key%20Obrigatória-orange.svg)](#)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietária%20%2F%20Portal%20de%20APIs-red.svg)](LICENSE)

---

## 🔒 Acesso à API e Chaves

Para consumir esta API nos seus sistemas, cadastre-se no nosso **[Ponte APIs Marketplace](https://ponte.ozpro.com.br)** para obter sua chave de acesso (`x-api-key`).

Todas as requisições aos endpoints em nuvem devem incluir a chave no cabeçalho:
```http
GET /api/validar-telefone?telefone=11996541234 HTTP/1.1
Host: validadortel-pro-api.ponte.ozpro.com.br
x-api-key: ponte_live_SUA_CHAVE_DO_PORTAL
```

---

## 🚀 Instalação (NPM)

```bash
npm install validadortel-pro
```

---

## ⚡ Uso com o SDK Oficial

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

## 🌐 Endpoint Anycast Edge (Requer x-api-key)

* **Endpoint Cloudflare:** `GET https://ponte.ozpro.com.br/api/validar-telefone?telefone=...`
* **Cluster:** Cloudflare Anycast (`ponte.ozpro.com.br`)
* **Autenticação:** Header `x-api-key` ou `Authorization: Bearer <key>`
* **Latência:** `<5ms`

### Exemplo via cURL:
```bash
curl -X GET "https://ponte.ozpro.com.br/api/validar-telefone?telefone=11987654321" \
  -H "x-api-key: ponte_live_SUA_CHAVE_DO_PORTAL"
```
```bash
curl -X GET "https://ponte.ozpro.com.br/api/validar-telefone?telefone=11987654321"
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
  "edge": "ponte.ozpro.com.br"
}
```

---

## 📄 Licença

Distribuído sob licença MIT. Veja `LICENSE` para mais detalhes.

Copyright (c) 2026 clepta2
