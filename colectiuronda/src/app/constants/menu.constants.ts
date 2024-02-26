import { MenuItem } from 'src/interfaces/menu';

export const MENU_ITEMS: { [key: string]: MenuItem } = {
  documentsType: {
    icon: 'documents',
    text: 'MENU.DOCUMENTS',
    url: '/documents',
  },
  domainsType: {
    icon: 'dominis',
    text: 'MENU.DOMINIS',
    url: '/domains',
  },
  banksType: {
    icon: 'banking',
    text: 'MENU.BANCS',
    url: '/banks',
  },
  localitTypes: {
    icon: 'locations',
    text: 'MENU.LOCALIT',
    url: '/management-a',
    children: [
      //Submenús
      {
        icon: 'child_care',
        text: 'SUBMENU.COUNTRIES',
        url: '/management-a/submenu-a1',
      },
      {
        icon: 'child_friendly',
        text: 'SUBMENU.PROVINCES',
        url: '/management-a/submenu-a2',
      },
      {
        icon: 'child_friendly',
        text: 'SUBMENU.COMMUNITIES',
        url: '/management-a/submenu-a2',
      },
      {
        icon: 'child_friendly',
        text: 'SUBMENU.TOWNS',
        url: '/management-a/submenu-a2',
      },
      {
        icon: 'child_friendly',
        text: 'SUBMENU.COMARCS',
        url: '/management-a/submenu-a2',
      },
      {
        icon: 'child_friendly',
        text: 'SUBMENU.POSTAL_CODES',
        url: '/management-a/submenu-a2',
      },
      {
        icon: 'child_friendly',
        text: 'SUBMENU.POBLATION',
        url: '/management-a/submenu-a2',
      },
    ],
  },

  cnaeTypes: {
    icon: 'cnae',
    text: 'MENU.CNAE',
    url: '/cnae',
  },

  comTypes: {
    icon: 'talk',
    text: 'MENU.COMUNICACIONS',
    url: '/management-a',
    children: [
      //Submenús
      {
        icon: 'communication',
        text: 'SUBMENU.MODESCOM',
        url: '/management-x',
      },
      {
        icon: 'communication',
        text: 'SUBMENU.MODESCOM',
        url: '/management-x',
      },
    ],
  },

  personesTypes: {
    icon: 'personal',
    text: 'MENU.PERSONES',
    url: '/management-a',
    children: [
      //Submenús
      {
        icon: 'generes',
        text: 'SUBMENU.GENERES',
        url: '/management-b',
      },
      {
        icon: 'communication',
        text: 'SUBMENU.TIPUSPERSON',
        url: '/management-x',
      },
      {
        icon: 'communication',
        text: 'SUBMENU.TIPUSPHONE',
        url: '/management-x',
      },
      {
        icon: 'communication',
        text: 'MENU.ESTATCIVIL',
        url: '/management-x',
      },
      { icon: 'adresa', text: 'SUBMENU.ADDRESSTYPE', url: '/addresstype' },
    ],
  },

  lopdTypes: {
    icon: 'lopd',
    text: 'MENU.LOPD',
    url: '/management-a',
    children: [
      //Submenús
      {
        icon: 'communication',
        text: 'SUBMENU.ORILOPD',
        url: '/management-x',
      },
      {
        icon: 'communication',
        text: 'SUBMENU.REGLOPD',
        url: '/management-x',
      },
    ],
  },

  relEmpresesTypes: {
    icon: 'company',
    text: 'MENU.EMPRESES',
    url: '/rel-empresas',
  },
  procedimentsTypes: {
    icon: 'banks',
    text: 'MENU.PROCEDIMENTS',
    url: '/pro-eco',
  },
  carpetesTypes: {
    icon: 'carpetes',
    text: 'MENU.CARPETES',
    url: '/carpetas',
  },

  replegalsTypes: {
    icon: 'book',
    text: 'MENU.REPLEGALS',
    url: '/rep-legal',
  },

  parametresTypes: {
    icon: 'settings',
    text: 'MENU.PARAMETRES',
    url: '/parameters',
  },
  metodespayTypes: {
    icon: 'payment',
    text: 'MENU.METODESPAY',
    url: '/pay-methods',
  },
};
