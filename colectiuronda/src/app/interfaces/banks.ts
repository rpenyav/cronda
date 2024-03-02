export interface Bank {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: string;
  code: number;
  swift: string;
  name: string;
  country: Country;
}

export interface Country {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: string;
  code: string;
  literalNameText: string | null;
}

export interface PaginatedResponse {
  allData: Bank[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Bank[];
}

export interface NewBank {
  code: string;
  name: string;
  countryCode: string;
}

export interface NewBanksPayload {
  newBanks: NewBank[];
}
