// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  notificationsPollMs: 5000,
  url: "http://trazas-nbi.com:1234/api/",
  // Si no estás corriendo el backend Nest localmente, usa el servidor remoto
  nest: "http://trazas-nbi.com:3000/",
  // node: "http://localhost:3700/api/",
  node: "http://trazas-nbi.com:3700/api/",
  // reporte: "http://localhost:3900/api/",
  reporte: "http://trazas-nbi.com:3900/api/",
  monedas: "https://mindicador.cl/api/",
  iva: 0.19,
  boleta: 0.1150,
  factor: 1000000,
  tipoGarantia: [
    'Cheque Garantia',
    'Boleta Garantia'
  ],
  bancos: [
    'Santander',
    'Itau',
    'Banco Chile',
    'Banco Estado'
  ],
  tiposOC: {
    ordenCompra: 1,
    egreso: 2,
    ingreso: 3,
    ordenPedido: 4,
    contrato: 5,
    bolsa: 6,
    cajaChica: 7
  },
  estadoMovimiento: {
    pendiente: 1,
    aprobado: 2,
    rechazado: 3,
    pagada: 4,
    anulada: 5,
    contrato: 6
  },
  estadoEP: {
    ordenCompra: 1,
    Comprometido: 2,
    Facturado: 3,
    Pagado: 4,
    Anulado: 5
  },
  declaracion: {
    exento: 1,
    afecto: 2,
    boleta: 3
  },
  tiposBolsas: [
    { id: 1, nombre: "Gastos Generales" },
    { id: 2, nombre: "Materiales - Sub Contrato" },
    { id: 3, nombre: "Mano de Obra Sueldos" },
    { id: 4, nombre: "Mano de Obra Imposiciones" },
    { id: 5, nombre: "Impuesto" }
  ],
  empresa: 3,
  correoNotificacion: "gomez.romero.oscar@gmail.com",
  perfiles: {
    subgerente: 1,
    director: 2,
    coordinador: 3,
    sistema: 4,
    administracion: 10,
    gerenteAdmin: 11,
    jefeAdministracion: 12
  },
  nombreSubTipoGasto: {
    arriendo: 'ARRIENDOS'
  }
};
