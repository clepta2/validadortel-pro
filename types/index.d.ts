export interface PaisInfo {
  codigo: string;
  iso3?: string;
  nome: string;
  nameEn?: string;
  ddi: string;
  flag: string;
}

export interface ComunicacaoInfo {
  aceitaSms: boolean;
  podeTerWhatsapp: boolean;
  tipoWhatsappProvavel: 'pessoal_ou_business' | 'apenas_whatsapp_business';
  whatsappLink: string | null;
}

export interface DetalhesOperadora {
  nome: string;
  tipo: string;
  origem: string;
  portabilidadeAviso?: string;
  principaisOperadorasPais?: string[];
}

export interface ResultadoValidacaoTelefone {
  valido: boolean;
  motivo?: string;
  informado?: string;
  tipo?: 'Móvel / Celular' | 'Fixo / Comercial' | 'Móvel / Celular Internacional' | 'Fixo Internacional' | 'Internacional';
  ehCelular?: boolean;
  ehFixo?: boolean;
  possuiWhatsapp?: boolean;
  operadora?: string;
  detalhesOperadora?: DetalhesOperadora;
  comunicacao?: ComunicacaoInfo;
  pais?: PaisInfo;
  ddd?: string;
  uf?: string;
  estado?: string;
  regiao?: string;
  numeroNacional?: string;
  numeroFormatado?: string;
  internacionalFormatado?: string;
  e164?: string;
  e164Limpo?: string;
  whatsappLink?: string | null;
  orgaoRegulador?: string;
  tamanhoRecebido?: number;
}

export declare class ValidadorTelPro {
  static detectarFake(limpo: string): { fake: boolean; motivo: string | null };
  static validarBrasil(limpo: string, comDdi?: boolean): ResultadoValidacaoTelefone;
  static validarInternacional(limpo: string): ResultadoValidacaoTelefone;
  static validar(inputTelefone: string, options?: Record<string, any>): ResultadoValidacaoTelefone;
}

export default ValidadorTelPro;
