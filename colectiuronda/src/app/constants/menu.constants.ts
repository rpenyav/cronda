import { MenuItem } from 'src/interfaces/menu';

export const MENU_ITEMS: { [key: string]: MenuItem } = {
  documentsType: {
    key: 'documentsType',
    icon: 'documents',
    text: 'MENU.DOCUMENTS',
    url: '/documents',
  },
  domainsType: {
    key: 'domainsType',
    icon: 'dominis',
    text: 'MENU.DOMINIS',
    url: '/domains',
  },
  banksType: {
    key: 'banksType',
    icon: 'banking',
    text: 'MENU.BANCS',
    url: '/banks',
  },
  localitTypes: {
    key: 'localitTypes',
    icon: 'locations',
    text: 'MENU.LOCALIT',
    url: '/management-a',
    children: [
      {
        key: 'countries',
        icon: 'child_care',
        text: 'SUBMENU.COUNTRIES',
        url: '/management-a/submenu-a1',
      },
      {
        key: 'provinces',
        icon: 'child_friendly',
        text: 'SUBMENU.PROVINCES',
        url: '/locations/provinces',
      },
      {
        key: 'communities',
        icon: 'child_friendly',
        text: 'SUBMENU.COMMUNITIES',
        url: '/management-a/submenu-a2',
      },
      {
        key: 'towns',
        icon: 'child_friendly',
        text: 'SUBMENU.TOWNS',
        url: '/management-a/submenu-a3',
      },
      {
        key: 'comarcs',
        icon: 'child_friendly',
        text: 'SUBMENU.COMARCS',
        url: '/management-a/submenu-a4',
      },
      {
        key: 'postalCodes',
        icon: 'child_friendly',
        text: 'SUBMENU.POSTAL_CODES',
        url: '/management-a/submenu-a5',
      },
      {
        key: 'poblation',
        icon: 'child_friendly',
        text: 'SUBMENU.POBLATION',
        url: '/management-a/submenu-a6',
      },
    ],
  },
  cnaeTypes: {
    key: 'cnaeTypes',
    icon: 'cnae',
    text: 'MENU.CNAE',
    url: '/cnae',
  },
  comTypes: {
    key: 'comTypes',
    icon: 'talk',
    text: 'MENU.COMUNICACIONS',
    url: '/management-a',
    children: [
      {
        key: 'modescom1',
        icon: 'communication',
        text: 'SUBMENU.MODESCOM',
        url: '/management-x',
      },
      {
        key: 'modescom2',
        icon: 'communication',
        text: 'SUBMENU.MODESCOM',
        url: '/management-x',
      },
    ],
  },
  personesTypes: {
    key: 'personesTypes',
    icon: 'personal',
    text: 'MENU.PERSONES',
    url: '/management-a',
    children: [
      {
        key: 'generes',
        icon: 'generes',
        text: 'SUBMENU.GENERES',
        url: '/management-b',
      },
      {
        key: 'tipusPerson',
        icon: 'communication',
        text: 'SUBMENU.TIPUSPERSON',
        url: '/management-x',
      },
      {
        key: 'tipusPhone',
        icon: 'communication',
        text: 'SUBMENU.TIPUSPHONE',
        url: '/management-x',
      },
      {
        key: 'estatCivil',
        icon: 'communication',
        text: 'MENU.ESTATCIVIL',
        url: '/management-x',
      },
      {
        key: 'addressType',
        icon: 'adresa',
        text: 'SUBMENU.ADDRESSTYPE',
        url: '/addresstype',
      },
    ],
  },
  lopdTypes: {
    key: 'lopdTypes',
    icon: 'lopd',
    text: 'MENU.LOPD',
    url: '/management-a',
    children: [
      {
        key: 'oriLopd',
        icon: 'communication',
        text: 'SUBMENU.ORILOPD',
        url: '/management-x',
      },
      {
        key: 'regLopd',
        icon: 'communication',
        text: 'SUBMENU.REGLOPD',
        url: '/management-x',
      },
    ],
  },
  relEmpresesTypes: {
    key: 'relEmpresesTypes',
    icon: 'company',
    text: 'MENU.EMPRESES',
    url: '/rel-empresas',
  },
  procedimentsTypes: {
    key: 'procedimentsTypes',
    icon: 'banks',
    text: 'MENU.PROCEDIMENTS',
    url: '/pro-eco',
  },
  carpetesTypes: {
    key: 'carpetesTypes',
    icon: 'carpetes',
    text: 'MENU.CARPETES',
    url: '/carpetas',
  },
  replegalsTypes: {
    key: 'replegalsTypes',
    icon: 'book',
    text: 'MENU.REPLEGALS',
    url: '/rep-legal',
  },
  parametresTypes: {
    key: 'parametresTypes',
    icon: 'settings',
    text: 'MENU.PARAMETRES',
    url: '/parameters',
  },
  metodespayTypes: {
    key: 'metodespayTypes',
    icon: 'payment',
    text: 'MENU.METODESPAY',
    url: '/pay-methods',
  },
};
