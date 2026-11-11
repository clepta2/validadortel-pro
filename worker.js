/**
 * worker.js
 * Cloudflare Worker Anycast para ValidadorTel Pro API (diffstoregja2.workers.dev)
 * Acesso protegido: requer chave de API gerada no Site de APIs.
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
        auth: 'Chave de API obrigat?ria (x-api-key)',
        status: 'online',
        github: 'https://github.com/clepta2/validadortel-pro'
      }, null, 2), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Landing / Documenta??o t?cnica no navegador
    if (pathname === '' || pathname === '/' || pathname === '/demo' || pathname === '/index.html') {
      if (wantsJson) {
        return new Response(JSON.stringify({
          ok: true,
          service: 'ValidadorTel Pro API',
          version: '1.0.0',
          cluster: 'Cloudflare Edge Anycast (diffstoregja2.workers.dev)',
          auth: 'Chave de API obrigat?ria (x-api-key)',
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
      // ?? TRAVA DE SEGURAN?A: Chave de API Obrigat?ria
      const apiKey = request.headers.get('x-api-key') ||
                     request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '') ||
                     url.searchParams.get('api_key') ||
                     url.searchParams.get('key');

      if (!apiKey || String(apiKey).trim().length < 16) {
        return new Response(JSON.stringify({
          ok: false,
          error: 'Acesso n?o autorizado. Chave de API ausente ou inv?lida.',
          mensagem: 'O consumo deste microsservi?o requer uma Chave de API ativa. Obtenha sua chave no nosso Portal de APIs e envie via header "x-api-key" ou "Authorization: Bearer SUA_CHAVE".',
          status: 401
        }, null, 2), {
          status: 401,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

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
  return "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>ValidadorTel Pro ? Documenta??o Oficial &amp; Teste de API</title>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap\" rel=\"stylesheet\">\n  <style>\n    :root {\n      --bg: #090d16;\n      --card: #111827;\n      --accent: #0ea5e9;\n      --text: #f9fafb;\n      --text-muted: #94a3b8;\n      --border: rgba(255,255,255,0.08);\n      --error: #ef4444;\n      --warning: #f59e0b;\n    }\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n      background: var(--bg);\n      color: var(--text);\n      font-family: 'Plus Jakarta Sans', sans-serif;\n      padding: 30px 20px;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      min-height: 100vh;\n    }\n    .container { max-width: 820px; width: 100%; }\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 6px;\n      padding: 6px 14px;\n      border-radius: 99px;\n      background: rgba(14,165,233,0.12);\n      border: 1px solid rgba(14,165,233,0.3);\n      color: var(--accent);\n      font-size: 12px;\n      font-weight: 700;\n      margin-bottom: 16px;\n    }\n    h1 { font-size: 30px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }\n    p.lead { color: var(--text-muted); font-size: 14.5px; margin-bottom: 24px; line-height: 1.6; }\n    .card {\n      background: var(--card);\n      border: 1px solid var(--border);\n      border-radius: 16px;\n      padding: 24px;\n      margin-bottom: 24px;\n      box-shadow: 0 10px 30px rgba(0,0,0,0.4);\n    }\n    .notice-box {\n      background: rgba(245, 158, 11, 0.08);\n      border: 1px dashed rgba(245, 158, 11, 0.35);\n      border-radius: 10px;\n      padding: 12px 16px;\n      margin-bottom: 18px;\n      font-size: 13px;\n      color: #fbbf24;\n      display: flex;\n      align-items: center;\n      gap: 10px;\n    }\n    .input-row { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }\n    .input-group { display: flex; gap: 10px; }\n    input {\n      flex: 1;\n      background: #040711;\n      border: 1px solid var(--border);\n      border-radius: 10px;\n      padding: 12px 16px;\n      color: #fff;\n      font-size: 14px;\n      font-family: 'JetBrains Mono', monospace;\n      outline: none;\n      transition: border-color 0.2s;\n    }\n    input:focus { border-color: var(--accent); }\n    button {\n      background: var(--accent);\n      color: #040711;\n      font-weight: 700;\n      border: none;\n      border-radius: 10px;\n      padding: 0 20px;\n      font-size: 14px;\n      cursor: pointer;\n      transition: opacity 0.2s;\n    }\n    button:hover { opacity: 0.9; }\n    .output-box {\n      background: #040711;\n      border: 1px solid var(--border);\n      border-radius: 12px;\n      padding: 16px;\n      font-family: 'JetBrains Mono', monospace;\n      font-size: 13px;\n      color: #38bdf8;\n      max-height: 380px;\n      overflow-y: auto;\n      white-space: pre-wrap;\n      line-height: 1.5;\n    }\n    footer {\n      color: var(--text-muted);\n      font-size: 12.5px;\n      margin-top: 20px;\n      text-align: center;\n      line-height: 1.6;\n    }\n    footer a { color: var(--accent); text-decoration: none; }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"badge\">?? Gateway Oficial &bull; Protegido por Chave de API</div>\n    <h1>ValidadorTel Pro ? Documenta??o da API</h1>\n    <p class=\"lead\">Microsservi?o de valida??o telef?nica de alta frequ?ncia (ANATEL, 67 DDDs, ITU E.164 e WhatsApp). O acesso aos endpoints na nuvem ? comercializado e controlado atrav?s do nosso <strong>Site de APIs</strong>.</p>\n\n    <div class=\"card\">\n      <div class=\"notice-box\">\n        <span>??</span>\n        <div><strong>Acesso Restrito:</strong> Requisi??es diretas a esta API exigem uma Chave de API v?lida no header <code>x-api-key</code>.</div>\n      </div>\n\n      <div class=\"input-row\">\n        <div>\n          <label style=\"font-size:12px;color:var(--text-muted);display:block;margin-bottom:6px\">Chave de API do Portal (x-api-key):</label>\n          <input type=\"password\" id=\"apiKeyInput\" placeholder=\"Insira sua Chave de API emitida pelo Site de APIs (ou teste no portal)\" value=\"\">\n        </div>\n        <div>\n          <label style=\"font-size:12px;color:var(--text-muted);display:block;margin-bottom:6px\">N?mero de Telefone:</label>\n          <div class=\"input-group\">\n            <input type=\"text\" id=\"telInput\" placeholder=\"ex: 11996541234 ou +351912345678\" value=\"11996541234\">\n            <button onclick=\"validar()\">Consultar API</button>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"output-box\" id=\"resultOutput\">Informe sua Chave de API e clique em \"Consultar API\" para enviar requisi??o autorizada.</div>\n    </div>\n\n    <footer>\n      Documenta??o T?cnica &bull; <a href=\"https://github.com/clepta2/validadortel-pro\" target=\"_blank\">Reposit?rio GitHub (clepta2/validadortel-pro)</a><br>\n      Todos os direitos reservados &bull; Disponibilizado via Portal Oficial de APIs.\n    </footer>\n  </div>\n\n  <script>\n    async function validar() {\n      const apiKey = document.getElementById('apiKeyInput').value.trim();\n      const val = document.getElementById('telInput').value.trim();\n      const out = document.getElementById('resultOutput');\n      out.innerText = 'Enviando requisi??o autenticada ao Gateway...';\n      try {\n        const headers = {};\n        if (apiKey) headers['x-api-key'] = apiKey;\n        const res = await fetch('/api/validar-telefone?telefone=' + encodeURIComponent(val), { headers });\n        const data = await res.json();\n        out.innerText = JSON.stringify(data, null, 2);\n      } catch (e) {\n        out.innerText = 'Erro na comunica??o: ' + e.message;\n      }\n    }\n  </script>\n</body>\n</html>";
}
