/**
 * data/timezones.js
 * Mapeamento de Fusos Horários (IANA Timezones) e Utilitários de Horário Comercial
 */

export const FUSOS_DDD_BRASIL = {
  // Fuso de Fernando de Noronha (UTC-2) - PE Ilha
  // Horário de Brasília (UTC-3)
  '11': 'America/Sao_Paulo', '12': 'America/Sao_Paulo', '13': 'America/Sao_Paulo', '14': 'America/Sao_Paulo',
  '15': 'America/Sao_Paulo', '16': 'America/Sao_Paulo', '17': 'America/Sao_Paulo', '18': 'America/Sao_Paulo', '19': 'America/Sao_Paulo',
  '21': 'America/Sao_Paulo', '22': 'America/Sao_Paulo', '24': 'America/Sao_Paulo',
  '27': 'America/Sao_Paulo', '28': 'America/Sao_Paulo',
  '31': 'America/Sao_Paulo', '32': 'America/Sao_Paulo', '33': 'America/Sao_Paulo', '34': 'America/Sao_Paulo',
  '35': 'America/Sao_Paulo', '37': 'America/Sao_Paulo', '38': 'America/Sao_Paulo',
  '41': 'America/Sao_Paulo', '42': 'America/Sao_Paulo', '43': 'America/Sao_Paulo', '44': 'America/Sao_Paulo', '45': 'America/Sao_Paulo', '46': 'America/Sao_Paulo',
  '47': 'America/Sao_Paulo', '48': 'America/Sao_Paulo', '49': 'America/Sao_Paulo',
  '51': 'America/Sao_Paulo', '53': 'America/Sao_Paulo', '54': 'America/Sao_Paulo', '55': 'America/Sao_Paulo',
  '61': 'America/Sao_Paulo', '62': 'America/Sao_Paulo', '64': 'America/Sao_Paulo', '63': 'America/Sao_Paulo',
  '71': 'America/Bahia', '73': 'America/Bahia', '74': 'America/Bahia', '75': 'America/Bahia', '77': 'America/Bahia',
  '79': 'America/Maceio', '82': 'America/Maceio',
  '81': 'America/Recife', '87': 'America/Recife',
  '83': 'America/Fortaleza', '84': 'America/Fortaleza', '85': 'America/Fortaleza', '88': 'America/Fortaleza',
  '86': 'America/Fortaleza', '89': 'America/Fortaleza', '98': 'America/Fortaleza', '99': 'America/Fortaleza',
  '91': 'America/Belem', '93': 'America/Santarem', '94': 'America/Belem', '96': 'America/Belem',
  // Fuso da Amazônia (UTC-4)
  '65': 'America/Cuiaba', '66': 'America/Cuiaba',
  '67': 'America/Campo_Grande',
  '69': 'America/Porto_Velho',
  '92': 'America/Manaus', '97': 'America/Manaus',
  '95': 'America/Boa_Vista',
  // Fuso do Acre (UTC-5)
  '68': 'America/Rio_Branco'
};

export const TIMEZONES_PAISES = {
  BR: 'America/Sao_Paulo',
  US: 'America/New_York',
  CA: 'America/Toronto',
  PT: 'Europe/Lisbon',
  ES: 'Europe/Madrid',
  GB: 'Europe/London',
  FR: 'Europe/Paris',
  DE: 'Europe/Berlin',
  IT: 'Europe/Rome',
  NL: 'Europe/Amsterdam',
  BE: 'Europe/Brussels',
  CH: 'Europe/Zurich',
  IE: 'Europe/Dublin',
  AR: 'America/Argentina/Buenos_Aires',
  CL: 'America/Santiago',
  UY: 'America/Montevideo',
  PY: 'America/Asuncion',
  CO: 'America/Bogota',
  PE: 'America/Lima',
  MX: 'America/Mexico_City',
  JP: 'Asia/Tokyo',
  CN: 'Asia/Shanghai',
  IN: 'Asia/Kolkata',
  AU: 'Australia/Sydney',
  AO: 'Africa/Luanda',
  MZ: 'Africa/Maputo',
  ZA: 'Africa/Johannesburg',
  AE: 'Asia/Dubai',
  IL: 'Asia/Jerusalem'
};

export function calcularFusoEHorario(timezoneStr) {
  try {
    const tz = timezoneStr || 'America/Sao_Paulo';
    const now = new Date();

    const dtf = new Intl.DateTimeFormat('pt-BR', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const dtfData = new Intl.DateTimeFormat('pt-BR', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long'
    });

    const dtfParts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: 'numeric',
      hour12: false
    });

    const horaLocal = dtf.format(now);
    const dataLocal = dtfData.format(now);
    const horaNum = parseInt(dtfParts.format(now), 10);

    // Dia da semana no fuso
    const dtfDay = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' });
    const dayName = dtfDay.format(now);
    const ehFimDeSemana = (dayName === 'Sat' || dayName === 'Sun');
    const ehDiaUtil = !ehFimDeSemana;

    // Janela comercial permitida por regulamentação (08:00 às 20:00 em dias úteis, 09:00 às 14:00 aos sábados)
    let emHorarioComercial = false;
    if (dayName !== 'Sun') {
      if (ehDiaUtil && horaNum >= 8 && horaNum < 20) {
        emHorarioComercial = true;
      } else if (dayName === 'Sat' && horaNum >= 9 && horaNum < 14) {
        emHorarioComercial = true;
      }
    }

    return {
      fuso: tz,
      horaLocal,
      dataLocal,
      diaSemana: dataLocal.split(',')[0],
      ehDiaUtil,
      emHorarioComercial,
      recomendacaoContato: emHorarioComercial
        ? 'Horário apropriado para contato comercial / cobrança / mensagens'
        : 'Fora do horário comercial legal no destino. Risco de rejeição ou violação de normas de cobrança.'
    };
  } catch (_) {
    return {
      fuso: 'UTC',
      horaLocal: new Date().toISOString().slice(11, 16),
      ehDiaUtil: true,
      emHorarioComercial: true,
      recomendacaoContato: 'Horário padrão UTC'
    };
  }
}
