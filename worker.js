/**
 * worker.js
 * Cloudflare Worker Anycast para ValidadorTel Pro API (diffstoregja2.workers.dev)
 */

import { ValidadorTelPro } from './validadortel-pro.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, '');

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

    if (pathname === '/health' || pathname === '/status' || pathname === '') {
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
          erro: 'Informe o parâmetro ?telefone=NUMERO',
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
      error: 'Endpoint não encontrado. Use /api/validar-telefone?telefone=...'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
};
