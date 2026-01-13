export const environment = {
  production: true,
  notificationsPollMs: 5000,
  url: "http://trazas-nbi.com:1234/api/",
  nest: "http://trazas-nbi.com:3000/",
  node: "http://trazas-nbi.com:3700/api/",
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
  correoNotificacion: "gerenciaFinanzas@trazas.cl",
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
