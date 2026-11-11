/**
 * worker.js
 * Cloudflare Worker Anycast para ValidadorTel Pro API (diffstoregja2.workers.dev)
 */

import { ValidadorTelPro } from './validadortel-pro.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, '');
    const wantsJson = url.searchParams.get('format') === 'json' || (request.headers.get('Accept') && request.headers.get('Accept').includes('application/json'));

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    if (pathname === '/health' || pathname === '/status') {
      return new Response(JSON.stringify({
        ok: true,
        service: 'ValidadorTel Pro API',
        version: '1.0.0',
        cluster: 'Cloudflare Edge Anycast (diffstoregja2.workers.dev)',
        status: 'online',
        github: 'https://github.com/clepta2/validadortel-pro'
      }, null, 2), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Landing / Playground visual no navegador
    if (pathname === '' || pathname === '/' || pathname === '/demo' || pathname === '/index.html') {
      if (wantsJson) {
        return new Response(JSON.stringify({
          ok: true,
          service: 'ValidadorTel Pro API',
          version: '1.0.0',
          cluster: 'Cloudflare Edge Anycast (diffstoregja2.workers.dev)',
          status: 'online',
          github: 'https://github.com/clepta2/validadortel-pro'
        }, null, 2), {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
        });
      }
      return new Response(getHtmlDemo(), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    if (
      pathname === '/api/validar-telefone' ||
      pathname === '/api/validar-celular' ||
      pathname === '/api/telefone/validar' ||
      pathname === '/api/telefone'
    ) {
      let telInput = url.searchParams.get('telefone') || url.searchParams.get('tel') || url.searchParams.get('celular') || url.searchParams.get('phone') || '';

      if (!telInput && request.method === 'POST') {
        try {
          const body = await request.json();
          telInput = body.telefone || body.tel || body.celular || body.phone || '';
        } catch (_) {}
      }

      if (!telInput) {
        return new Response(JSON.stringify({
          ok: false,
          valido: false,
          erro: 'Informe o par?metro ?telefone=NUMERO',
          exemplos: {
            celularSP: '/api/validar-telefone?telefone=11987654321',
            fixoRJ: '/api/validar-telefone?telefone=2125401234',
            comDdi: '/api/validar-telefone?telefone=5511987654321',
            internacional: '/api/validar-telefone?telefone=14155552671'
          }
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
        });
      }

      const res = ValidadorTelPro.validar(telInput);
      return new Response(JSON.stringify({
        ok: res.valido,
        ...res,
        edge: 'diffstoregja2.workers.dev',
        audit: { timestamp: new Date().toISOString() }
      }, null, 2), {
        status: res.valido ? 200 : 422,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300'
        }
      });
    }

    return new Response(JSON.stringify({
      ok: false,
      error: 'Endpoint n?o encontrado. Use /api/validar-telefone?telefone=...'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

function getHtmlDemo() {
  return "<!DOCTYPE html>\r\n<html lang=\"pt-BR\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>ValidadorTel Pro — Playground &amp; Demonstração</title>\r\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\r\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n  <link href=\"https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap\" rel=\"stylesheet\">\r\n  <style>\r\n    :root {\r\n      --bg: #090d16;\r\n      --card: #111827;\r\n      --accent: #0ea5e9;\r\n      --accent-glow: rgba(14, 165, 233, 0.25);\r\n      --text: #f9fafb;\r\n      --text-muted: #94a3b8;\r\n      --border: rgba(255,255,255,0.08);\r\n      --success: #10b981;\r\n      --error: #ef4444;\r\n    }\r\n    * { box-sizing: border-box; margin: 0; padding: 0; }\r\n    body {\r\n      background: var(--bg);\r\n      color: var(--text);\r\n      font-family: 'Plus Jakarta Sans', sans-serif;\r\n      padding: 30px 20px;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      min-height: 100vh;\r\n    }\r\n    .container { max-width: 820px; width: 100%; }\r\n    .badge {\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 6px;\r\n      padding: 6px 14px;\r\n      border-radius: 99px;\r\n      background: rgba(14,165,233,0.12);\r\n      border: 1px solid rgba(14,165,233,0.3);\r\n      color: var(--accent);\r\n      font-size: 12px;\r\n      font-weight: 700;\r\n      margin-bottom: 16px;\r\n    }\r\n    h1 { font-size: 32px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }\r\n    p.lead { color: var(--text-muted); font-size: 15px; margin-bottom: 28px; line-height: 1.6; }\r\n    .card {\r\n      background: var(--card);\r\n      border: 1px solid var(--border);\r\n      border-radius: 16px;\r\n      padding: 24px;\r\n      margin-bottom: 24px;\r\n      box-shadow: 0 10px 30px rgba(0,0,0,0.4);\r\n    }\r\n    .input-group { display: flex; gap: 12px; margin-bottom: 16px; }\r\n    input {\r\n      flex: 1;\r\n      background: #040711;\r\n      border: 1px solid var(--border);\r\n      border-radius: 10px;\r\n      padding: 14px 18px;\r\n      color: #fff;\r\n      font-size: 15px;\r\n      font-family: 'JetBrains Mono', monospace;\r\n      outline: none;\r\n      transition: border-color 0.2s;\r\n    }\r\n    input:focus { border-color: var(--accent); }\r\n    button {\r\n      background: var(--accent);\r\n      color: #040711;\r\n      font-weight: 700;\r\n      border: none;\r\n      border-radius: 10px;\r\n      padding: 0 24px;\r\n      font-size: 14px;\r\n      cursor: pointer;\r\n      transition: transform 0.1s, opacity 0.2s;\r\n    }\r\n    button:hover { opacity: 0.9; }\r\n    button:active { transform: scale(0.98); }\r\n    .quick-examples {\r\n      display: flex;\r\n      flex-wrap: wrap;\r\n      gap: 8px;\r\n      margin-bottom: 20px;\r\n    }\r\n    .quick-btn {\r\n      background: rgba(255,255,255,0.04);\r\n      border: 1px solid var(--border);\r\n      color: var(--text-muted);\r\n      border-radius: 8px;\r\n      padding: 6px 12px;\r\n      font-size: 12px;\r\n      font-weight: 600;\r\n      cursor: pointer;\r\n    }\r\n    .quick-btn:hover { color: #fff; border-color: var(--accent); }\r\n    .output-box {\r\n      background: #040711;\r\n      border: 1px solid var(--border);\r\n      border-radius: 12px;\r\n      padding: 18px;\r\n      font-family: 'JetBrains Mono', monospace;\r\n      font-size: 13px;\r\n      color: #38bdf8;\r\n      max-height: 420px;\r\n      overflow-y: auto;\r\n      white-space: pre-wrap;\r\n      line-height: 1.5;\r\n    }\r\n    footer {\r\n      color: var(--text-muted);\r\n      font-size: 13px;\r\n      margin-top: 20px;\r\n      text-align: center;\r\n    }\r\n    footer a { color: var(--accent); text-decoration: none; }\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"container\">\r\n    <div class=\"badge\">🌐 ITU-T E.164 &bull; ANATEL 67 DDDs &bull; Edge &lt;5ms</div>\r\n    <h1>ValidadorTel Pro</h1>\r\n    <p class=\"lead\">Validação de celulares e fixos, detecção de operadoras no Brasil e no mundo, checagem de aceitação de SMS, links para WhatsApp e fusos horários locais.</p>\r\n\r\n    <div class=\"card\">\r\n      <div class=\"quick-examples\">\r\n        <button class=\"quick-btn\" onclick=\"testar('(11) 99654-1234')\">🇧🇷 Vivo SP</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('(11) 99123-4567')\">🇧🇷 Claro SP</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('(21) 98111-2233')\">🇧🇷 TIM RJ</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('(11) 3254-1234')\">🇧🇷 Fixo Comercial</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('+351 912 345 678')\">🇵🇹 Vodafone Portugal</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('+351 961 234 567')\">🇵🇹 MEO Portugal</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('+44 7911 123456')\">🇬🇧 Reino Unido</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('+33 6 12 34 56 78')\">🇫🇷 França</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('+244 923 123 456')\">🇦🇴 Angola Unitel</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('+1 (415) 555-2671')\">🇺🇸 EUA / Califórnia</button>\r\n        <button class=\"quick-btn\" onclick=\"testar('11111111111')\" style=\"color:var(--error)\">❌ Fake Repetido</button>\r\n      </div>\r\n\r\n      <div class=\"input-group\">\r\n        <input type=\"text\" id=\"telInput\" placeholder=\"Digite o telefone nacional ou internacional...\" value=\"(11) 99654-1234\">\r\n        <button onclick=\"validar()\">Validar Agora</button>\r\n      </div>\r\n\r\n      <div class=\"output-box\" id=\"resultOutput\">Pronto para validar. Clique em um dos botões ou digite um telefone acima.</div>\r\n    </div>\r\n\r\n    <footer>\r\n      Código aberto no <a href=\"https://github.com/clepta2/validadortel-pro\" target=\"_blank\">GitHub (clepta2/validadortel-pro)</a>\r\n    </footer>\r\n  </div>\r\n\r\n  <script type=\"module\">\r\n    import { ValidadorTelPro } from '../validadortel-pro.js';\r\n\r\n    window.validar = function() {\r\n      const val = document.getElementById('telInput').value;\r\n      const res = ValidadorTelPro.validar(val);\r\n      document.getElementById('resultOutput').innerText = JSON.stringify(res, null, 2);\r\n    };\r\n\r\n    window.testar = function(num) {\r\n      document.getElementById('telInput').value = num;\r\n      window.validar();\r\n    };\r\n\r\n    window.validar();\r\n  </script>\r\n</body>\r\n</html>\r\n";
}
