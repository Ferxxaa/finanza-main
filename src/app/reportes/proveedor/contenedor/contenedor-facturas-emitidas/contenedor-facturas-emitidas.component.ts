import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mCentroCosto } from '../../../../models/mCentroCosto';
import { ReporteVentas } from '../../../../models/nestReportVentas';
import { reporteVentasService } from '../../../../services/Nest/reporteVentas.service';
import { sCentroCosto } from '../../../../services/sCentroCosto.service';
import { sOrdenComra } from '../../../../services/sOrdenComra.service';

interface tablaResumenAgno {
  mes: string,
  registrosClientes: registroClientes[]
}

interface registroClientes {
  facturas: number,
  tipo: string,
  cliente: string,
  areaNegocio: string,
  centroCosto: mCentroCostoLocal,
  glosa: string,
  fechaEmision: string,
  montoBruto: number,
  estado: string
}

interface mCentroCostoLocal {
  nombre: string,
  colorLetra: string,
  colorFondo: string
}

interface resumenAnual {
  tipo: string,
  facturas: number,
  montoNeto: number
}

@Component({
  selector: 'app-contenedor-facturas-emitidas',
  templateUrl: './contenedor-facturas-emitidas.component.html',
  styleUrls: ['./contenedor-facturas-emitidas.component.css'],
  providers: [
    sCentroCosto,
    sOrdenComra,
    reporteVentasService
  ]
})
export class ContenedorFacturasEmitidasComponent implements OnInit {

  years$: Observable<number[]>;
  reporteVentas$: Observable<ReporteVentas[]>;

  ResumenAgno: tablaResumenAgno[];
  ResumenAgnoOrigen: tablaResumenAgno[];
  proyectadas: registroClientes[];

  loading: boolean;
  resumen: boolean;
  tipoFacturacion: boolean;
  areaNegocio: boolean;
  centroCostoBol: boolean;
  facturacionMensual: boolean;
  tortas: boolean;

  agno: number;
  agnos: number[];

  centroCosto: any;

  centroCosto$: Observable<mCentroCosto>

  totalNeto: number;

  constructor(
    private CentroCosto: sCentroCosto,
    private OrdenCompra: sOrdenComra,
    private reporteVentasService: reporteVentasService
  ) {
    this.totalNeto = 0;
    this.loading = false;
    this.agnos = [2018, 2019, 2020, 2021]
    this.agno = new Date().getFullYear();
    this.resumen = false;
    this.tortas = false;
    this.tipoFacturacion = false;
    this.areaNegocio = false;
    this.centroCostoBol = false;
    this.facturacionMensual = false;
    this.centroCosto$ = this.CentroCosto.getCentroCosto();
    this.setDefaultValue();
    this.years$ = this.reporteVentasService.getYears();
    this.reporteVentas$ = null;
    this.reporteVentas$ = this.reporteVentasService.getReportByYear(this.agno);
  }

  private setDefaultValue() {
    // this.ResumenAgno = [
    //   {
    //     mes: "Enero", registrosClientes: [
    //       { facturas: 392, tipo: "Afecta", cliente: "FUNDACION SAN IGNACIO DEL HUINAY", areaNegocio: "Construcción", centroCosto: { nombre: "HUINAY 2", colorLetra: "rgb(247, 243, 243)", colorFondo: "rgb(11, 157, 1)" }, glosa: "ESTADO DE PAGO N°2 FUNDACIÓN SAN IGNACIO DEL HUINAY", fechaEmision: "02-01-2020", montoBruto: 109454947, estado: "Pagado" },
    //       { facturas: 395, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-01-2020", montoBruto: 162037880, estado: "Pagado" },
    //       { facturas: 392, tipo: "Afecta", cliente: "FUNDACION SAN IGNACIO DEL HUINAY", areaNegocio: "Construcción", centroCosto: { nombre: "HUINAY 2", colorLetra: "rgb(247, 243, 243)", colorFondo: "rgb(11, 157, 1)" }, glosa: "ESTADO DE PAGO N°2 FUNDACIÓN SAN IGNACIO DEL HUINAY", fechaEmision: "02-01-2020", montoBruto: 109454947, estado: "Pagado" },
    //       { facturas: 395, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-01-2020", montoBruto: 162037880, estado: "Pagado" },
    //       { facturas: 394, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°12A EDIFICIO MATRIZ TAI PING", fechaEmision: "03-01-2020", montoBruto: 187039015, estado: "Pagado" },
    //       { facturas: 395, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-01-2020", montoBruto: 162037880, estado: "Pagado" },
    //       { facturas: 396, tipo: "Exenta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-01-2020", montoBruto: 198390563, estado: "Pagado" }
    //     ]
    //   },
    //   {
    //     mes: "Febrero", registrosClientes: [
    //       { facturas: 397, tipo: "Afecta", cliente: "FUNDACION SAN IGNACIO DEL HUINAY", areaNegocio: "Construcción", centroCosto: { nombre: "HUINAY 2", colorLetra: "rgb(247, 243, 243)", colorFondo: "rgb(11, 157, 1)" }, glosa: "ESTADO DE PAGO N°2 FUNDACIÓN SAN IGNACIO DEL HUINAY", fechaEmision: "02-02-2020", montoBruto: 109454947, estado: "Pagado" },
    //       { facturas: 398, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°12A EDIFICIO MATRIZ TAI PING", fechaEmision: "03-02-2020", montoBruto: 187039015, estado: "Pagado" },
    //       { facturas: 398, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°12A EDIFICIO MATRIZ TAI PING", fechaEmision: "03-02-2020", montoBruto: 187039015, estado: "Pagado" },
    //       { facturas: 399, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-02-2020", montoBruto: 162037880, estado: "Pagado" },
    //       { facturas: 398, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°12A EDIFICIO MATRIZ TAI PING", fechaEmision: "03-02-2020", montoBruto: 187039015, estado: "Pagado" },
    //       { facturas: 400, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-02-2020", montoBruto: 198390563, estado: "Pagado" }
    //     ]
    //   },
    //   {
    //     mes: "Marzo", registrosClientes: [
    //       { facturas: 401, tipo: "Afecta", cliente: "FUNDACION SAN IGNACIO DEL HUINAY", areaNegocio: "Construcción", centroCosto: { nombre: "HUINAY 2", colorLetra: "rgb(247, 243, 243)", colorFondo: "rgb(11, 157, 1)" }, glosa: "ESTADO DE PAGO N°2 FUNDACIÓN SAN IGNACIO DEL HUINAY", fechaEmision: "02-03-2020", montoBruto: 109454947, estado: "Pagado" },
    //       { facturas: 402, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°12A EDIFICIO MATRIZ TAI PING", fechaEmision: "03-03-2020", montoBruto: 187039015, estado: "Pagado" },
    //       { facturas: 403, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-03-2020", montoBruto: 162037880, estado: "Pagado" },
    //       { facturas: 404, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-03-2020", montoBruto: 198390563, estado: "Pagado" },
    //       { facturas: 404, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-03-2020", montoBruto: 198390563, estado: "Pagado" },
    //       { facturas: 401, tipo: "Afecta", cliente: "FUNDACION SAN IGNACIO DEL HUINAY", areaNegocio: "Construcción", centroCosto: { nombre: "HUINAY 2", colorLetra: "rgb(247, 243, 243)", colorFondo: "rgb(11, 157, 1)" }, glosa: "ESTADO DE PAGO N°2 FUNDACIÓN SAN IGNACIO DEL HUINAY", fechaEmision: "02-03-2020", montoBruto: 109454947, estado: "Pagado" },
    //       { facturas: 404, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-03-2020", montoBruto: 198390563, estado: "Pagado" },
    //       { facturas: 403, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-03-2020", montoBruto: 162037880, estado: "Pagado" },
    //       { facturas: 404, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-03-2020", montoBruto: 198390563, estado: "Pendiente" },
    //       { facturas: 404, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-03-2020", montoBruto: 198390563, estado: "Pendiente" }
    //     ]
    //   },
    // ]
    // this.proyectadas = [
    //   { facturas: null, tipo: "Afecta", cliente: "FUNDACION SAN IGNACIO DEL HUINAY", areaNegocio: "Construcción", centroCosto: { nombre: "HUINAY 2", colorLetra: "rgb(247, 243, 243)", colorFondo: "rgb(11, 157, 1)" }, glosa: "ESTADO DE PAGO N°2 FUNDACIÓN SAN IGNACIO DEL HUINAY", fechaEmision: "02-03-2020", montoBruto: 109454947, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-03-2020", montoBruto: 162037880, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-03-2020", montoBruto: 198390563, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-03-2020", montoBruto: 162037880, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "FUNDACION SAN IGNACIO DEL HUINAY", areaNegocio: "Construcción", centroCosto: { nombre: "HUINAY 2", colorLetra: "rgb(247, 243, 243)", colorFondo: "rgb(11, 157, 1)" }, glosa: "ESTADO DE PAGO N°2 FUNDACIÓN SAN IGNACIO DEL HUINAY", fechaEmision: "02-03-2020", montoBruto: 109454947, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-03-2020", montoBruto: 162037880, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-03-2020", montoBruto: 162037880, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "FUNDACION SAN IGNACIO DEL HUINAY", areaNegocio: "Construcción", centroCosto: { nombre: "HUINAY 2", colorLetra: "rgb(247, 243, 243)", colorFondo: "rgb(11, 157, 1)" }, glosa: "ESTADO DE PAGO N°2 FUNDACIÓN SAN IGNACIO DEL HUINAY", fechaEmision: "02-03-2020", montoBruto: 109454947, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "ENEL GENERACIÓN CHILE S.A.", areaNegocio: "Arquitectura", centroCosto: { nombre: "Enel Piso 14R", colorLetra: "rgb(255, 255, 255)", colorFondo: "rgb(46, 35, 241)" }, glosa: "ESTADO DE PAGO N°02, SERVICIO REALIZADO DE CIERRE PERIMETRAL EDIFICIO ENEL", fechaEmision: "05-03-2020", montoBruto: 162037880, estado: "Pendiente" },
    //   { facturas: null, tipo: "Afecta", cliente: "ALIMENTOS FORMOSA LTDA.", areaNegocio: "Construcción", centroCosto: { nombre: "TAI PING", colorLetra: "rgb(24, 116, 216)", colorFondo: "rgb(255, 255, 0)" }, glosa: "ESTADO DE PAGO N°13A EDIFICIO MATRIZ TAI PING", fechaEmision: "17-03-2020", montoBruto: 198390563, estado: "Pendiente" },
    // ]
  }

  ngOnInit() {
    this.agno = new Date().getFullYear();
    // console.log("El año es:" + this.agno );

    this.findRepo(new Date().getFullYear())
  }

  findRepo(agno: number) {
    // console.log(agno);
    this.reporteVentas$ = null;
    this.reporteVentas$ = this.reporteVentasService.getReportByYear(this.agno);
    // 
    // this.loading = true;
    // let temp = [];
    // this.OrdenCompra.getVentas().subscribe(res => {
    //   let arrAgno = this.filtraAgno(agno, res);
    //   for (let index = 1; index < 13; index++) {
    //     temp.push({ mes: this.retMes(index), registrosClientes: this.retRegistros(arrAgno, index) })
    //   }
    //   // let ResumenAgno
    //   // ResumenAgno = temp.map(el => ({ mes: el.mes, registroClientes: el.registroClientes.filter(filter => filter.facturas) }))
    //   this.ResumenAgno = temp.map(el => ({ mes: el.mes, registrosClientes: el.registrosClientes.filter(filter => filter.facturas && filter.montoBruto) }))
    //   this.ResumenAgnoOrigen = temp.map(el => ({ mes: el.mes, registrosClientes: el.registrosClientes.filter(filter => filter.facturas && filter.montoBruto) }))
    //   this.proyectadas = temp.reduce((acc, el) => acc.concat(el.registrosClientes.filter(filter => !filter.facturas && filter.montoBruto)), [])
    //   // console.clear();
    //   this.totalNeto = this.ResumenAgno.reduce((acc, el) => acc + this.retTotalNeto(el.registrosClientes), 0);
    //   if (this.centroCosto != "0")
    //     this.findCentroCosto();
    //   this.loading = false;
    // })
  }

  retMes(mes: number) {
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    return meses[mes - 1]
  }

  retRegistros(arr: any, mes) {
    let regMeses = arr.filter(el => new Date(el.fecha).getMonth() + 1 == mes)
    // console.log(regMeses);

    return regMeses.map(el => ({ facturas: el.factura, tipo: el.tipo, cliente: el.cliente, areaNegocio: el.centroCosto, centroCosto: el.subCentro, glosa: el.descripcion, fechaEmision: this.retFecha(el.fecha.split("T")[0]), montoBruto: el.costo, estado: el.estadoPago == 4 ? 'Pagado' : 'Pendiente' }))
  }

  retFecha(fecha: string) {
    return fecha.split("-")[2] + "/" + fecha.split("-")[1] + "/" + fecha.split("-")[0]
  }

  filtraAgno(agno: number, arr: any[]) {
    // console.log(arr); 
    return arr.filter(el => new Date(el.fecha).getFullYear() == agno && el.centroCosto != 'Trazas Operacional')
  }

  findCentroCosto() {
    if (this.centroCosto != "0") {
      this.loading = true;
      let centro = this.centroCosto;
      if (this.ResumenAgnoOrigen)
        this.ResumenAgno = this.ResumenAgnoOrigen.map(el => { return { mes: el.mes, registrosClientes: this.filtrar(centro, el.registrosClientes, el.mes) } });
      if (this.proyectadas)
        this.proyectadas = this.filtrar(centro, this.proyectadas)
      if (this.ResumenAgnoOrigen.length)
      this.totalNeto = this.ResumenAgnoOrigen.reduce((acc, el) => acc + this.retTotalNeto(el.registrosClientes), 0);
      this.loading = false;
    }
    else
      if (this.agno)
        this.findRepo(this.agno);
      else
        this.findRepo(new Date().getFullYear());
  }

  filtrar(centroCosto: string, arr: registroClientes[], mes?: string): registroClientes[] {
    if (centroCosto)
      return arr.filter(el => el.centroCosto.nombre.toUpperCase() == centroCosto.toUpperCase());
    else
      return arr
  }

  retTotalNeto(arr: registroClientes[]): number {
    if (!arr)
      return 0
    return arr.reduce((acc, el) => acc + (el.tipo == 'Afecta' ? el.montoBruto / 1.19 : el.montoBruto), 0)
  }

}
