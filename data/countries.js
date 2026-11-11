/**
 * data/countries.js
 * Catálogo Mundial Oficial de Telefonia (ITU-T E.164)
 * Mapeamento de Códigos de País (DDI), ISO-2, ISO-3, Nomes, Bandeiras,
 * Faixas de Tamanho, Prefixos Móveis e Principais Operadoras de Telecom.
 */

export const WORLD_COUNTRIES = [
  // ─── AMÉRICAS ───
  {
    code: 'BR', iso3: 'BRA', ddi: '55', nome: 'Brasil', nameEn: 'Brazil', flag: '🇧🇷',
    min: 10, max: 11, trunkPrefix: '0',
    mobilePattern: '^9[6-9]\\d{7}$',
    operadoras: ['Vivo', 'Claro', 'TIM', 'Algar Telecom', 'Sercomtel']
  },
  {
    code: 'US', iso3: 'USA', ddi: '1', nome: 'Estados Unidos', nameEn: 'United States', flag: '🇺🇸',
    min: 10, max: 10, trunkPrefix: '1',
    operadoras: ['Verizon Wireless', 'AT&T Mobility', 'T-Mobile US']
  },
  {
    code: 'CA', iso3: 'CAN', ddi: '1', nome: 'Canadá', nameEn: 'Canada', flag: '🇨🇦',
    min: 10, max: 10, trunkPrefix: '1',
    operadoras: ['Rogers Wireless', 'Bell Mobility', 'Telus Mobility']
  },
  {
    code: 'AR', iso3: 'ARG', ddi: '54', nome: 'Argentina', nameEn: 'Argentina', flag: '🇦🇷',
    min: 10, max: 11, trunkPrefix: '0',
    mobilePattern: '^9?\\d{10}$',
    operadoras: ['Personal (Telecom)', 'Movistar Argentina', 'Claro Argentina']
  },
  {
    code: 'CL', iso3: 'CHL', ddi: '56', nome: 'Chile', nameEn: 'Chile', flag: '🇨🇱',
    min: 9, max: 9, trunkPrefix: '',
    mobilePattern: '^9\\d{8}$',
    operadoras: ['Entel Chile', 'Movistar Chile', 'Claro Chile', 'WOM']
  },
  {
    code: 'CO', iso3: 'COL', ddi: '57', nome: 'Colômbia', nameEn: 'Colombia', flag: '🇨🇴',
    min: 10, max: 10, trunkPrefix: '0',
    mobilePattern: '^3\\d{9}$',
    operadoras: ['Claro Colombia', 'Tigo Colombia', 'Movistar Colombia', 'WOM']
  },
  {
    code: 'MX', iso3: 'MEX', ddi: '52', nome: 'México', nameEn: 'Mexico', flag: '🇲🇽',
    min: 10, max: 11, trunkPrefix: '01',
    mobilePattern: '^(?:1\\d{10}|\\d{10})$',
    operadoras: ['Telcel (América Móvil)', 'AT&T México', 'Movistar México']
  },
  {
    code: 'PE', iso3: 'PER', ddi: '51', nome: 'Peru', nameEn: 'Peru', flag: '🇵🇪',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^9\\d{8}$',
    operadoras: ['Claro Perú', 'Movistar Perú', 'Entel Perú', 'Bitel']
  },
  {
    code: 'UY', iso3: 'URY', ddi: '598', nome: 'Uruguai', nameEn: 'Uruguay', flag: '🇺🇾',
    min: 8, max: 9, trunkPrefix: '0',
    mobilePattern: '^9\\d{7}$',
    operadoras: ['Antel', 'Movistar Uruguay', 'Claro Uruguay']
  },
  {
    code: 'PY', iso3: 'PRY', ddi: '595', nome: 'Paraguai', nameEn: 'Paraguay', flag: '🇵🇾',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^9[6-9]\\d{6}$',
    operadoras: ['Tigo Paraguay', 'Personal Paraguay', 'Claro Paraguay']
  },
  {
    code: 'BO', iso3: 'BOL', ddi: '591', nome: 'Bolívia', nameEn: 'Bolivia', flag: '🇧🇴',
    min: 8, max: 8, trunkPrefix: '0',
    mobilePattern: '^[67]\\d{7}$',
    operadoras: ['Entel Bolivia', 'Tigo Bolivia', 'Viva']
  },
  {
    code: 'VE', iso3: 'VEN', ddi: '58', nome: 'Venezuela', nameEn: 'Venezuela', flag: '🇻🇪',
    min: 10, max: 10, trunkPrefix: '0',
    mobilePattern: '^4\\d{9}$',
    operadoras: ['Movilnet', 'Movistar Venezuela', 'Digitel']
  },
  {
    code: 'EC', iso3: 'ECU', ddi: '593', nome: 'Equador', nameEn: 'Ecuador', flag: '🇪🇨',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^9\\d{8}$',
    operadoras: ['Claro Ecuador', 'Movistar Ecuador', 'CNT']
  },

  // ─── EUROPA ───
  {
    code: 'PT', iso3: 'PRT', ddi: '351', nome: 'Portugal', nameEn: 'Portugal', flag: '🇵🇹',
    min: 9, max: 9, trunkPrefix: '',
    mobilePattern: '^9[1236]\\d{7}$',
    operadoras: ['MEO (Altice)', 'Vodafone Portugal', 'NOS']
  },
  {
    code: 'ES', iso3: 'ESP', ddi: '34', nome: 'Espanha', nameEn: 'Spain', flag: '🇪🇸',
    min: 9, max: 9, trunkPrefix: '',
    mobilePattern: '^[67]\\d{8}$',
    operadoras: ['Movistar (Telefónica)', 'Vodafone España', 'Orange España', 'MásMóvil']
  },
  {
    code: 'GB', iso3: 'GBR', ddi: '44', nome: 'Reino Unido', nameEn: 'United Kingdom', flag: '🇬🇧',
    min: 10, max: 10, trunkPrefix: '0',
    mobilePattern: '^7\\d{9}$',
    operadoras: ['EE', 'Vodafone UK', 'O2 UK (Virgin Media)', 'Three UK']
  },
  {
    code: 'FR', iso3: 'FRA', ddi: '33', nome: 'França', nameEn: 'France', flag: '🇫🇷',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^[67]\\d{8}$',
    operadoras: ['Orange France', 'SFR', 'Bouygues Telecom', 'Free Mobile']
  },
  {
    code: 'DE', iso3: 'DEU', ddi: '49', nome: 'Alemanha', nameEn: 'Germany', flag: '🇩🇪',
    min: 10, max: 11, trunkPrefix: '0',
    mobilePattern: '^1[567]\\d{7,8}$',
    operadoras: ['Telekom Deutschland (T-Mobile)', 'Vodafone Deutschland', 'Telefónica O2']
  },
  {
    code: 'IT', iso3: 'ITA', ddi: '39', nome: 'Itália', nameEn: 'Italy', flag: '🇮🇹',
    min: 9, max: 10, trunkPrefix: '',
    mobilePattern: '^3\\d{8,9}$',
    operadoras: ['TIM Italia', 'Vodafone Italia', 'Wind Tre', 'Iliad Italia']
  },
  {
    code: 'NL', iso3: 'NLD', ddi: '31', nome: 'Holanda', nameEn: 'Netherlands', flag: '🇳🇱',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^6\\d{8}$',
    operadoras: ['KPN', 'VodafoneZiggo', 'Odido (ex-T-Mobile)']
  },
  {
    code: 'BE', iso3: 'BEL', ddi: '32', nome: 'Bélgica', nameEn: 'Belgium', flag: '🇧🇪',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^4\\d{8}$',
    operadoras: ['Proximus', 'Orange Belgium', 'Base (Telenet)']
  },
  {
    code: 'CH', iso3: 'CHE', ddi: '41', nome: 'Suíça', nameEn: 'Switzerland', flag: '🇨🇭',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^7[5-9]\\d{7}$',
    operadoras: ['Swisscom', 'Sunrise', 'Salt Mobile']
  },
  {
    code: 'IE', iso3: 'IRL', ddi: '353', nome: 'Irlanda', nameEn: 'Ireland', flag: '🇮🇪',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^8[3-9]\\d{7}$',
    operadoras: ['Vodafone Ireland', 'Three Ireland', 'Eir']
  },
  {
    code: 'AT', iso3: 'AUT', ddi: '43', nome: 'Áustria', nameEn: 'Austria', flag: '🇦🇹',
    min: 10, max: 13, trunkPrefix: '0',
    mobilePattern: '^6\\d{8,11}$',
    operadoras: ['A1 Telekom Austria', 'Magenta Telekom', 'Drei (Three)']
  },
  {
    code: 'SE', iso3: 'SWE', ddi: '46', nome: 'Suécia', nameEn: 'Sweden', flag: '🇸🇪',
    min: 9, max: 10, trunkPrefix: '0',
    mobilePattern: '^7\\d{8}$',
    operadoras: ['Telia Sweden', 'Tele2', 'Telenor', 'Tre (Three)']
  },
  {
    code: 'NO', iso3: 'NOR', ddi: '47', nome: 'Noruega', nameEn: 'Norway', flag: '🇳🇴',
    min: 8, max: 8, trunkPrefix: '',
    mobilePattern: '^[49]\\d{7}$',
    operadoras: ['Telenor Norway', 'Telia Norge', 'ice']
  },
  {
    code: 'DK', iso3: 'DNK', ddi: '45', nome: 'Dinamarca', nameEn: 'Denmark', flag: '🇩🇰',
    min: 8, max: 8, trunkPrefix: '',
    mobilePattern: '^[2-9]\\d{7}$',
    operadoras: ['TDC (YouSee)', 'Telenor Denmark', 'Telia', '3 (Three)']
  },
  {
    code: 'PL', iso3: 'POL', ddi: '48', nome: 'Polônia', nameEn: 'Poland', flag: '🇵🇱',
    min: 9, max: 9, trunkPrefix: '',
    mobilePattern: '^[4-8]\\d{8}$',
    operadoras: ['Orange Polska', 'Play (P4)', 'Plus (Polkomtel)', 'T-Mobile Polska']
  },
  {
    code: 'GR', iso3: 'GRC', ddi: '30', nome: 'Grécia', nameEn: 'Greece', flag: '🇬🇷',
    min: 10, max: 10, trunkPrefix: '',
    mobilePattern: '^69\\d{8}$',
    operadoras: ['Cosmote', 'Vodafone Greece', 'Nova (Wind)']
  },
  {
    code: 'RU', iso3: 'RUS', ddi: '7', nome: 'Rússia', nameEn: 'Russia', flag: '🇷🇺',
    min: 10, max: 10, trunkPrefix: '8',
    mobilePattern: '^9\\d{9}$',
    operadoras: ['MTS', 'MegaFon', 'Beeline', 'Tele2 Russia']
  },

  // ─── ÁSIA & OCEANIA ───
  {
    code: 'JP', iso3: 'JPN', ddi: '81', nome: 'Japão', nameEn: 'Japan', flag: '🇯🇵',
    min: 10, max: 10, trunkPrefix: '0',
    mobilePattern: '^[789]0\\d{8}$',
    operadoras: ['NTT Docomo', 'au (KDDI)', 'SoftBank', 'Rakuten Mobile']
  },
  {
    code: 'CN', iso3: 'CHN', ddi: '86', nome: 'China', nameEn: 'China', flag: '🇨🇳',
    min: 11, max: 11, trunkPrefix: '0',
    mobilePattern: '^1[3-9]\\d{9}$',
    operadoras: ['China Mobile', 'China Telecom', 'China Unicom', 'China Broadnet']
  },
  {
    code: 'IN', iso3: 'IND', ddi: '91', nome: 'Índia', nameEn: 'India', flag: '🇮🇳',
    min: 10, max: 10, trunkPrefix: '0',
    mobilePattern: '^[6-9]\\d{9}$',
    operadoras: ['Reliance Jio', 'Bharti Airtel', 'Vodafone Idea (Vi)', 'BSNL']
  },
  {
    code: 'KR', iso3: 'KOR', ddi: '82', nome: 'Coreia do Sul', nameEn: 'South Korea', flag: '🇰🇷',
    min: 9, max: 10, trunkPrefix: '0',
    mobilePattern: '^10\\d{8}$',
    operadoras: ['SK Telecom', 'KT Corporation', 'LG Uplus']
  },
  {
    code: 'AU', iso3: 'AUS', ddi: '61', nome: 'Austrália', nameEn: 'Australia', flag: '🇦🇺',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^4\\d{8}$',
    operadoras: ['Telstra', 'Optus (Singtel)', 'TPG Telecom (Vodafone AU)']
  },
  {
    code: 'NZ', iso3: 'NZL', ddi: '64', nome: 'Nova Zelândia', nameEn: 'New Zealand', flag: '🇳🇿',
    min: 8, max: 10, trunkPrefix: '0',
    mobilePattern: '^2\\d{7,9}$',
    operadoras: ['One NZ (Vodafone)', 'Spark New Zealand', '2degrees']
  },
  {
    code: 'IL', iso3: 'ISR', ddi: '972', nome: 'Israel', nameEn: 'Israel', flag: '🇮🇱',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^5\\d{8}$',
    operadoras: ['Cellcom', 'Partner (Orange)', 'Pelephone', 'Hot Mobile']
  },
  {
    code: 'AE', iso3: 'ARE', ddi: '971', nome: 'Emirados Árabes', nameEn: 'United Arab Emirates', flag: '🇦🇪',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^5\\d{8}$',
    operadoras: ['e& (Etisalat)', 'du (Emirates Integrated)']
  },
  {
    code: 'SA', iso3: 'SAU', ddi: '966', nome: 'Arábia Saudita', nameEn: 'Saudi Arabia', flag: '🇸🇦',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^5\\d{8}$',
    operadoras: ['stc (Saudi Telecom)', 'Mobily', 'Zain KSA']
  },
  {
    code: 'SG', iso3: 'SGP', ddi: '65', nome: 'Singapura', nameEn: 'Singapore', flag: '🇸🇬',
    min: 8, max: 8, trunkPrefix: '',
    mobilePattern: '^[89]\\d{7}$',
    operadoras: ['Singtel', 'StarHub', 'M1', 'SIMBA (TPG)']
  },

  // ─── ÁFRICA ───
  {
    code: 'AO', iso3: 'AGO', ddi: '244', nome: 'Angola', nameEn: 'Angola', flag: '🇦🇴',
    min: 9, max: 9, trunkPrefix: '',
    mobilePattern: '^9[1-49]\\d{7}$',
    operadoras: ['Unitel', 'Movicel', 'Africell Angola']
  },
  {
    code: 'MZ', iso3: 'MOZ', ddi: '258', nome: 'Moçambique', nameEn: 'Mozambique', flag: '🇲🇿',
    min: 9, max: 9, trunkPrefix: '',
    mobilePattern: '^8[2-7]\\d{7}$',
    operadoras: ['Vodacom Moçambique', 'Tmcel', 'Movitel']
  },
  {
    code: 'CV', iso3: 'CPV', ddi: '238', nome: 'Cabo Verde', nameEn: 'Cape Verde', flag: '🇨🇻',
    min: 7, max: 7, trunkPrefix: '',
    mobilePattern: '^[95]\\d{6}$',
    operadoras: ['CV Móvel (Cabo Verde Telecom)', 'Unitel T+']
  },
  {
    code: 'ZA', iso3: 'ZAF', ddi: '27', nome: 'África do Sul', nameEn: 'South Africa', flag: '🇿🇦',
    min: 9, max: 9, trunkPrefix: '0',
    mobilePattern: '^[678]\\d{8}$',
    operadoras: ['Vodacom SA', 'MTN South Africa', 'Telkom Mobile', 'Cell C']
  },
  {
    code: 'NG', iso3: 'NGA', ddi: '234', nome: 'Nigéria', nameEn: 'Nigeria', flag: '🇳🇬',
    min: 10, max: 10, trunkPrefix: '0',
    mobilePattern: '^[789]\\d{9}$',
    operadoras: ['MTN Nigeria', 'Airtel Nigeria', 'Glo (Globacom)', '9mobile']
  },
  {
    code: 'EG', iso3: 'EGY', ddi: '20', nome: 'Egito', nameEn: 'Egypt', flag: '🇪🇬',
    min: 10, max: 10, trunkPrefix: '0',
    mobilePattern: '^1[0125]\\d{8}$',
    operadoras: ['Vodafone Egypt', 'Orange Egypt', 'Etisalat Egypt', 'WE (Telecom Egypt)']
  }
];

// Mapeamento de prefixos móveis rápidos por DDI para inferir operadora internacional
export const OPERADORAS_PREFIXOS_INTERNACIONAIS = {
  // Portugal (351)
  '351': [
    { prefix: /^91/, operadora: 'Vodafone Portugal' },
    { prefix: /^92[1-9]/, operadora: 'MEO (Altice)' },
    { prefix: /^93/, operadora: 'NOS' },
    { prefix: /^96/, operadora: 'MEO (Altice)' },
    { prefix: /^2/, operadora: 'Rede Fixa Nacional (MEO/NOS)' }
  ],
  // Reino Unido (44)
  '44': [
    { prefix: /^7[1-9]/, operadora: 'Operadora Móvel UK (EE / Vodafone / O2 / Three)' },
    { prefix: /^[12]/, operadora: 'Rede Fixa BT / Virgin Media' }
  ],
  // Espanha (34)
  '34': [
    { prefix: /^[67]/, operadora: 'Operadora Móvel Espanha (Movistar / Vodafone / Orange)' },
    { prefix: /^[89]/, operadora: 'Rede Fixa Telefónica de España' }
  ],
  // França (33)
  '33': [
    { prefix: /^[67]/, operadora: 'Operadora Móvel França (Orange / SFR / Bouygues / Free)' },
    { prefix: /^[1-5]/, operadora: 'Rede Fixa Orange France' }
  ],
  // Alemanha (49)
  '49': [
    { prefix: /^1[567]/, operadora: 'Operadora Móvel Alemanha (Telekom / Vodafone / O2)' },
    { prefix: /^[2-9]/, operadora: 'Rede Fixa Deutsche Telekom' }
  ],
  // Itália (39)
  '39': [
    { prefix: /^3/, operadora: 'Operadora Móvel Itália (TIM / Vodafone / Wind Tre / Iliad)' },
    { prefix: /^0/, operadora: 'Rede Fixa Telecom Italia' }
  ],
  // Angola (244)
  '244': [
    { prefix: /^9[12]/, operadora: 'Unitel Angola' },
    { prefix: /^9[34]/, operadora: 'Movicel' },
    { prefix: /^99/, operadora: 'Africell Angola' }
  ],
  // Moçambique (258)
  '258': [
    { prefix: /^8[45]/, operadora: 'Vodacom Moçambique' },
    { prefix: /^8[23]/, operadora: 'Tmcel' },
    { prefix: /^8[67]/, operadora: 'Movitel' }
  ],
  // Estados Unidos / Canadá (1)
  '1': [
    { prefix: /^[2-9]\d{2}/, operadora: 'Operadora Norte-Americana (Verizon / AT&T / T-Mobile)' }
  ]
};
