/**
 * validadortel-pro.js
 * SDK Oficial e Algoritmo Universal de Validação, Sanitização e Normalização Telefônica (ANATEL & ITU E.164)
 */

import { WORLD_COUNTRIES, OPERADORAS_PREFIXOS_INTERNACIONAIS } from './data/countries.js';
import { FUSOS_DDD_BRASIL, TIMEZONES_PAISES, calcularFusoEHorario } from './data/timezones.js';

export const DDD_MAP = {
  // Centro-Oeste
  '61': { uf: 'DF', estado: 'Distrito Federal', regiao: 'Centro-Oeste' },
  '62': { uf: 'GO', estado: 'Goiás', regiao: 'Centro-Oeste' },
  '64': { uf: 'GO', estado: 'Goiás', regiao: 'Centro-Oeste' },
  '65': { uf: 'MT', estado: 'Mato Grosso', regiao: 'Centro-Oeste' },
  '66': { uf: 'MT', estado: 'Mato Grosso', regiao: 'Centro-Oeste' },
  '67': { uf: 'MS', estado: 'Mato Grosso do Sul', regiao: 'Centro-Oeste' },
  // Nordeste
  '71': { uf: 'BA', estado: 'Bahia', regiao: 'Nordeste' },
  '73': { uf: 'BA', estado: 'Bahia', regiao: 'Nordeste' },
  '74': { uf: 'BA', estado: 'Bahia', regiao: 'Nordeste' },
  '75': { uf: 'BA', estado: 'Bahia', regiao: 'Nordeste' },
  '77': { uf: 'BA', estado: 'Bahia', regiao: 'Nordeste' },
  '79': { uf: 'SE', estado: 'Sergipe', regiao: 'Nordeste' },
  '81': { uf: 'PE', estado: 'Pernambuco', regiao: 'Nordeste' },
  '87': { uf: 'PE', estado: 'Pernambuco', regiao: 'Nordeste' },
  '82': { uf: 'AL', estado: 'Alagoas', regiao: 'Nordeste' },
  '83': { uf: 'PB', estado: 'Paraíba', regiao: 'Nordeste' },
  '84': { uf: 'RN', estado: 'Rio Grande do Norte', regiao: 'Nordeste' },
  '85': { uf: 'CE', estado: 'Ceará', regiao: 'Nordeste' },
  '88': { uf: 'CE', estado: 'Ceará', regiao: 'Nordeste' },
  '86': { uf: 'PI', estado: 'Piauí', regiao: 'Nordeste' },
  '89': { uf: 'PI', estado: 'Piauí', regiao: 'Nordeste' },
  '98': { uf: 'MA', estado: 'Maranhão', regiao: 'Nordeste' },
  '99': { uf: 'MA', estado: 'Maranhão', regiao: 'Nordeste' },
  // Norte
  '68': { uf: 'AC', estado: 'Acre', regiao: 'Norte' },
  '69': { uf: 'RO', estado: 'Rondônia', regiao: 'Norte' },
  '91': { uf: 'PA', estado: 'Pará', regiao: 'Norte' },
  '93': { uf: 'PA', estado: 'Pará', regiao: 'Norte' },
  '94': { uf: 'PA', estado: 'Pará', regiao: 'Norte' },
  '92': { uf: 'AM', estado: 'Amazonas', regiao: 'Norte' },
  '97': { uf: 'AM', estado: 'Amazonas', regiao: 'Norte' },
  '95': { uf: 'RR', estado: 'Roraima', regiao: 'Norte' },
  '96': { uf: 'AP', estado: 'Amapá', regiao: 'Norte' },
  '63': { uf: 'TO', estado: 'Tocantins', regiao: 'Norte' },
  // Sudeste
  '11': { uf: 'SP', estado: 'São Paulo (Região Metropolitana)', regiao: 'Sudeste' },
  '12': { uf: 'SP', estado: 'São Paulo (Vale do Paraíba / Litoral Norte)', regiao: 'Sudeste' },
  '13': { uf: 'SP', estado: 'São Paulo (Baixada Santista / Litoral Sul)', regiao: 'Sudeste' },
  '14': { uf: 'SP', estado: 'São Paulo (Bauru / Marília)', regiao: 'Sudeste' },
  '15': { uf: 'SP', estado: 'São Paulo (Sorocaba / Itapeva)', regiao: 'Sudeste' },
  '16': { uf: 'SP', estado: 'São Paulo (Ribeirão Preto / Franca)', regiao: 'Sudeste' },
  '17': { uf: 'SP', estado: 'São Paulo (São José do Rio Preto)', regiao: 'Sudeste' },
  '18': { uf: 'SP', estado: 'São Paulo (Presidente Prudente / Araçatuba)', regiao: 'Sudeste' },
  '19': { uf: 'SP', estado: 'São Paulo (Campinas / Piracicaba)', regiao: 'Sudeste' },
  '21': { uf: 'RJ', estado: 'Rio de Janeiro (Região Metropolitana)', regiao: 'Sudeste' },
  '22': { uf: 'RJ', estado: 'Rio de Janeiro (Campos / Macaé / Cabo Frio)', regiao: 'Sudeste' },
  '24': { uf: 'RJ', estado: 'Rio de Janeiro (Petrópolis / Volta Redonda)', regiao: 'Sudeste' },
  '27': { uf: 'ES', estado: 'Espírito Santo (Vitória / Região Metropolitana)', regiao: 'Sudeste' },
  '28': { uf: 'ES', estado: 'Espírito Santo (Cachoeiro de Itapemirim)', regiao: 'Sudeste' },
  '31': { uf: 'MG', estado: 'Minas Gerais (Belo Horizonte)', regiao: 'Sudeste' },
  '32': { uf: 'MG', estado: 'Minas Gerais (Juiz de Fora)', regiao: 'Sudeste' },
  '33': { uf: 'MG', estado: 'Minas Gerais (Governador Valadares)', regiao: 'Sudeste' },
  '34': { uf: 'MG', estado: 'Minas Gerais (Uberlândia)', regiao: 'Sudeste' },
  '35': { uf: 'MG', estado: 'Minas Gerais (Poços de Caldas / Pouso Alegre)', regiao: 'Sudeste' },
  '37': { uf: 'MG', estado: 'Minas Gerais (Divinópolis)', regiao: 'Sudeste' },
  '38': { uf: 'MG', estado: 'Minas Gerais (Montes Claros)', regiao: 'Sudeste' },
  // Sul
  '41': { uf: 'PR', estado: 'Paraná (Curitiba / Litoral)', regiao: 'Sul' },
  '42': { uf: 'PR', estado: 'Paraná (Ponta Grossa / Guarapuava)', regiao: 'Sul' },
  '43': { uf: 'PR', estado: 'Paraná (Londrina / Apucarana)', regiao: 'Sul' },
  '44': { uf: 'PR', estado: 'Paraná (Maringá / Campo Mourão)', regiao: 'Sul' },
  '45': { uf: 'PR', estado: 'Paraná (Foz do Iguaçu / Cascavel)', regiao: 'Sul' },
  '46': { uf: 'PR', estado: 'Paraná (Francisco Beltrão / Pato Branco)', regiao: 'Sul' },
  '47': { uf: 'SC', estado: 'Santa Catarina (Joinville / Blumenau)', regiao: 'Sul' },
  '48': { uf: 'SC', estado: 'Santa Catarina (Florianópolis / Criciúma)', regiao: 'Sul' },
  '49': { uf: 'SC', estado: 'Santa Catarina (Chapecó / Lages)', regiao: 'Sul' },
  '51': { uf: 'RS', estado: 'Rio Grande do Sul (Porto Alegre)', regiao: 'Sul' },
  '53': { uf: 'RS', estado: 'Rio Grande do Sul (Pelotas / Rio Grande)', regiao: 'Sul' },
  '54': { uf: 'RS', estado: 'Rio Grande do Sul (Caxias do Sul / Passo Fundo)', regiao: 'Sul' },
  '55': { uf: 'RS', estado: 'Rio Grande do Sul (Santa Maria / Uruguaiana)', regiao: 'Sul' }
};

export const DDI_CATALOG = WORLD_COUNTRIES;

export class ValidadorTelPro {
  static detectarFake(limpo) {
    // 1. Dígitos todos repetidos (ex: 11111111111, 00000000000, 99999999999)
    if (/^(\d)\1{7,}$/.test(limpo)) {
      return { fake: true, motivo: 'Número forjado com repetição excessiva do mesmo dígito' };
    }

    // 2. Sequências completas óbvias de teste (123456789, 012345678)
    if (/123456789|012345678/.test(limpo)) {
      return { fake: true, motivo: 'Número contém sequência óbvia de teclado ou teste' };
    }

    // 3. Sufixo totalmente zerado (ex: 99000-0000, 0000-0000)
    if (/000000$/.test(limpo)) {
      return { fake: true, motivo: 'Número de teste com zeros finais consecutivos' };
    }

    return { fake: false, motivo: null };
  }

  static deduzirOperadora(ddd, corpo, isCelular) {
    if (!isCelular) {
      const d1 = corpo.charAt(0);
      let nome = 'Concessionária Local STFC';
      if (d1 === '3') {
        nome = (ddd >= '11' && ddd <= '19') ? 'Vivo (Telefônica Fixo)' : 'Oi / V.tal (Fixo)';
      } else if (d1 === '2') {
        nome = 'Claro (Embratel Fixo)';
      } else if (d1 === '4' || d1 === '5') {
        nome = 'Vivo (GVT) / Operadoras Locais STFC';
      }
      return {
        nome,
        tipo: 'STFC (Serviço Telefônico Fixo Comutado)',
        origem: 'Plano Básico de Numeração ANATEL'
      };
    }

    const p3 = corpo.slice(0, 3);
    let nome = 'Operadora Móvel Nacional (SMP)';
    if ((ddd === '34' || ddd === '37') && (p3 === '999' || p3 === '996')) {
      nome = 'Algar Telecom';
    } else if (ddd === '43' && p3 === '991') {
      nome = 'Sercomtel Celular';
    } else if (['971', '972', '973', '974', '975', '995', '996', '997', '998', '999'].includes(p3)) {
      nome = 'Vivo (Telefônica Brasil)';
    } else if (['968', '976', '991', '992', '993', '994', '964'].includes(p3)) {
      nome = 'Claro (América Móvil)';
    } else if (['981', '982', '983', '984', '979', '980'].includes(p3)) {
      nome = 'TIM Brasil';
    } else if (['985', '986', '987', '988', '989'].includes(p3)) {
      if (['11','12','13','14','15','16','17','18','19','51','53','54','55'].includes(ddd)) {
        nome = 'Claro (Ex-Oi Móvel por Partilha ANATEL)';
      } else if (['21','22','24','27','28'].includes(ddd)) {
        nome = 'Vivo (Ex-Oi Móvel por Partilha ANATEL)';
      } else {
        nome = 'TIM Brasil (Ex-Oi Móvel por Partilha ANATEL)';
      }
    }

    return {
      nome,
      tipo: 'SMP (Serviço Móvel Pessoal)',
      origem: 'Plano Básico de Numeração ANATEL',
      portabilidadeAviso: 'Baseado na faixa oficial de outorga ANATEL. Caso tenha ocorrido portabilidade numérica posterior, a linha pode estar operando em outra operadora.'
    };
  }

  static validarBrasil(limpo, comDdi = false) {
    let nat = limpo;
    if (comDdi && nat.startsWith('55')) {
      nat = nat.slice(2);
    }

    if (nat.length !== 10 && nat.length !== 11) {
      return {
        valido: false,
        motivo: `Quantidade de dígitos inválida para o Brasil: esperado 10 (fixo) ou 11 (celular). Recebido: ${nat.length}`
      };
    }

    const ddd = nat.slice(0, 2);
    const dddInfo = DDD_MAP[ddd];

    if (!dddInfo) {
      return {
        valido: false,
        motivo: `DDD '${ddd}' não existe na tabela oficial da ANATEL`
      };
    }

    const fake = this.detectarFake(nat);
    if (fake.fake) {
      return {
        valido: false,
        motivo: fake.motivo
      };
    }

    const isCelular = nat.length === 11;
    const primeiroDigitoNumero = nat.charAt(2);

    if (isCelular) {
      // Regra oficial ANATEL: Celulares brasileiros DEVEM começar com 9
      if (primeiroDigitoNumero !== '9') {
        return {
          valido: false,
          motivo: `Celulares no Brasil devem conter 11 dígitos e iniciar com 9 após o DDD (recebido: ${primeiroDigitoNumero})`
        };
      }

      // Segundo dígito do celular geralmente varia de 6 a 9 no Brasil
      const segundoDigito = nat.charAt(3);
      if (!['6', '7', '8', '9'].includes(segundoDigito)) {
        return {
          valido: false,
          motivo: `Faixa de celular inválida: no Brasil os celulares iniciam com 96, 97, 98 ou 99 (recebido: 9${segundoDigito})`
        };
      }
    } else {
      // Telefone fixo (10 dígitos): primeiro dígito do número varia de 2 a 5
      if (!['2', '3', '4', '5'].includes(primeiroDigitoNumero)) {
        return {
          valido: false,
          motivo: `Telefones fixos no Brasil iniciam com dígitos de 2 a 5 após o DDD (recebido: ${primeiroDigitoNumero})`
        };
      }
    }

    const numeroCorpo = nat.slice(2);
    const formatado = isCelular
      ? `(${ddd}) ${numeroCorpo.slice(0, 5)}-${numeroCorpo.slice(5)}`
      : `(${ddd}) ${numeroCorpo.slice(0, 4)}-${numeroCorpo.slice(4)}`;

    const e164 = `+55${nat}`;
    const e164Limpo = `55${nat}`;
    const operadora = this.deduzirOperadora(ddd, numeroCorpo, isCelular);
    const fusoInfo = calcularFusoEHorario(FUSOS_DDD_BRASIL[ddd] || 'America/Sao_Paulo');

    return {
      valido: true,
      tipo: isCelular ? 'Móvel / Celular' : 'Fixo / Comercial',
      ehCelular: isCelular,
      ehFixo: !isCelular,
      possuiWhatsapp: isCelular,
      operadora: operadora.nome,
      detalhesOperadora: operadora,
      fusoHorario: fusoInfo,
      scoreQualidade: isCelular ? 100 : 90,
      comunicacao: {
        aceitaSms: isCelular,
        podeTerWhatsapp: true,
        tipoWhatsappProvavel: isCelular ? 'pessoal_ou_business' : 'apenas_whatsapp_business',
        whatsappLink: isCelular ? `https://wa.me/${e164Limpo}` : null
      },
      pais: { codigo: 'BR', nome: 'Brasil', ddi: '55', flag: '🇧🇷' },
      ddd,
      uf: dddInfo.uf,
      estado: dddInfo.estado,
      regiao: dddInfo.regiao,
      numeroNacional: nat,
      numeroFormatado: formatado,
      internacionalFormatado: `+55 ${formatado}`,
      e164,
      e164Limpo,
      whatsappLink: isCelular ? `https://wa.me/${e164Limpo}` : null,
      orgaoRegulador: 'ANATEL (Agência Nacional de Telecomunicações)'
    };
  }

  static validarInternacional(limpo) {
    // Ordena do maior DDI para o menor para garantir correspondência exata
    const sortedCountries = [...WORLD_COUNTRIES].sort((a, b) => b.ddi.length - a.ddi.length);

    for (const c of sortedCountries) {
      if (limpo.startsWith(c.ddi)) {
        let nat = limpo.slice(c.ddi.length);

        // Se o usuário digitou o prefixo de discagem local (trunk prefix, ex: '0' na Europa ou '1' no México), normaliza
        if (c.trunkPrefix && nat.startsWith(c.trunkPrefix) && nat.length > c.max) {
          nat = nat.slice(c.trunkPrefix.length);
        }

        if (nat.length >= c.min && nat.length <= c.max) {
          const fake = this.detectarFake(nat);
          if (fake.fake) return { valido: false, motivo: fake.motivo };

          // Determina se é celular baseado no padrão do país
          let isCelular = true;
          if (c.mobilePattern) {
            try {
              const reg = new RegExp(c.mobilePattern);
              isCelular = reg.test(nat);
            } catch (_) {}
          }

          // Identifica operadora internacional por prefixo ou catálogo de líderes
          let operadoraNome = c.operadoras && c.operadoras.length > 0 ? c.operadoras[0] : 'Operadora Local Internacional';
          const prefixRules = OPERADORAS_PREFIXOS_INTERNACIONAIS[c.ddi];
          if (prefixRules) {
            for (const r of prefixRules) {
              if (r.prefix.test(nat)) {
                operadoraNome = r.operadora;
                break;
              }
            }
          }

          const e164 = `+${c.ddi}${nat}`;
          const e164Limpo = `${c.ddi}${nat}`;
          const fusoInfo = calcularFusoEHorario(TIMEZONES_PAISES[c.code] || 'UTC');

          return {
            valido: true,
            tipo: isCelular ? 'Móvel / Celular Internacional' : 'Fixo Internacional',
            ehCelular: isCelular,
            ehFixo: !isCelular,
            possuiWhatsapp: isCelular,
            operadora: operadoraNome,
            detalhesOperadora: {
              nome: operadoraNome,
              tipo: isCelular ? 'Mobile Network Operator (MNO)' : 'Fixed Line Operator',
              principaisOperadorasPais: c.operadoras || []
            },
            fusoHorario: fusoInfo,
            scoreQualidade: isCelular ? 95 : 85,
            comunicacao: {
              aceitaSms: isCelular,
              podeTerWhatsapp: true,
              tipoWhatsappProvavel: isCelular ? 'pessoal_ou_business' : 'apenas_whatsapp_business',
              whatsappLink: isCelular ? `https://wa.me/${e164Limpo}` : null
            },
            pais: {
              codigo: c.code,
              iso3: c.iso3,
              nome: c.nome,
              nameEn: c.nameEn,
              ddi: c.ddi,
              flag: c.flag
            },
            numeroNacional: nat,
            numeroFormatado: `+${c.ddi} ${nat}`,
            e164,
            e164Limpo,
            whatsappLink: isCelular ? `https://wa.me/${e164Limpo}` : null,
            orgaoRegulador: `ITU-T E.164 (${c.nome})`
          };
        }
      }
    }

    return {
      valido: false,
      motivo: 'Número internacional não reconhecido ou comprimento incompatível com o DDI do país'
    };
  }

  static validar(inputTelefone, options = {}) {
    if (!inputTelefone || typeof inputTelefone !== 'string') {
      return { valido: false, motivo: 'Telefone não informado' };
    }

    const raw = String(inputTelefone).trim();
    const limpo = raw.replace(/\D/g, '');

    if (!limpo) {
      return { valido: false, informado: raw, motivo: 'Entrada não contém dígitos numéricos' };
    }

    // 1. Prefixo internacional explícito com '+' que não seja +55
    if (raw.startsWith('+') && !raw.startsWith('+55')) {
      return this.validarInternacional(limpo);
    }

    // 2. Se começa com 55 e tem 12 ou 13 dígitos -> Brasil com DDI
    if (limpo.startsWith('55') && (limpo.length === 12 || limpo.length === 13)) {
      return this.validarBrasil(limpo, true);
    }

    // 3. Se tem 10 ou 11 dígitos -> Verifica se o DDD é brasileiro válido e segue o padrão nacional
    if (limpo.length === 10 || limpo.length === 11) {
      const ddd = limpo.slice(0, 2);
      const isBrMobile = limpo.length === 11 && limpo.charAt(2) === '9';
      const isBrFixed = limpo.length === 10 && ['2', '3', '4', '5'].includes(limpo.charAt(2));

      if (DDD_MAP[ddd] && (isBrMobile || isBrFixed)) {
        return this.validarBrasil(limpo, false);
      }

      // Se não segue o padrão estrito brasileiro (ex: França DDI 33 com 11 dígitos), tenta internacional primeiro
      const intl = this.validarInternacional(limpo);
      if (intl.valido) return intl;

      if (DDD_MAP[ddd]) {
        return this.validarBrasil(limpo, false);
      }
      return intl;
    }

    // 4. Outros países (DDI internacional de 8 a 15 dígitos)
    if (limpo.length >= 8 && limpo.length <= 15) {
      return this.validarInternacional(limpo);
    }

    return {
      valido: false,
      informado: raw,
      tamanhoRecebido: limpo.length,
      motivo: `Quantidade de dígitos inválida: esperado entre 10 e 13 dígitos para o Brasil, ou 8 a 15 dígitos internacional. Recebido: ${limpo.length}`
    };
  }

  /**
   * Consulta a API Cloudflare Edge Oficial da Ponte
   * @param {string} telefone
   * @param {Object} [options]
   * @returns {Promise<Object>}
   */
  async validarRemoto(telefone, options = {}) {
    const raw = String(telefone || '').trim();
    const endpoint = (options.endpoint || this.endpoint || 'https://ponte.ozpro.com.br').replace(/\/$/, '');
    const apiKey = options.apiKey || this.apiKey || '';
    const url = `${endpoint}/api/validar-telefone?telefone=${encodeURIComponent(raw)}`;

    const headers = { 'Accept': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    const res = await fetch(url, { headers });
    return await res.json();
  }
}

export default ValidadorTelPro;
