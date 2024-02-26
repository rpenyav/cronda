import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment.prod';

export const API_ENDPOINTS = {
  LOGIN: `${environment.apiBaseUrl}/login`,
  ADDRESS_TYPES_ENDPOINT: `${environment.apiBaseUrl}/address_types`,
  BANKS_ENDPOINT: `${environment.apiBaseUrl}/banks`,
  CARPETAS_ENDPOINT: `${environment.apiBaseUrl}/banks`,
  DOMAINS_ENDPOINT: `${environment.apiBaseUrl}/domains`,
  CNAE_ENDPOINT: `${environment.apiBaseUrl}/domains`,
  DOCUMENTS_ENDPOINT: `${environment.apiBaseUrl}/domains`,
  PAY_METHODS: `${environment.apiBaseUrl}/domains`,
  PRO_ECO: `${environment.apiBaseUrl}/domains`,
  REP_LEGAL_ENDPOINT: `${environment.apiBaseUrl}/domains`,
};
