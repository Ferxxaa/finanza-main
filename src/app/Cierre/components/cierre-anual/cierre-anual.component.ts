import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { forkJoin } from 'rxjs/observable/forkJoin'
import { mOrdenCompra } from '../../../models/mOrdenCompra';
import { sOrdenPedido } from '../../../services/sOrdenPedido.service';
import { sCierre } from '../../../services/sCierre.service';

declare var $: any;

@Component({
  selector: 'app-cierre-anual',
  templateUrl: './cierre-anual.component.html',
  styleUrls: ['./cierre-anual.component.css'],
  providers: [
    sCentroCosto,
    sOrdenComra,
    sOrdenPedido,
    sCierre
  ]
})
export class CierreAnualComponent implements OnInit {

  @Input() totales: any[];

  @Output() reload = new EventEmitter();
  @Output() selectCentro = new EventEmitter();
  @Output() listado = new EventEmitter();

  agno: number;

  centroCosto$: Observable<mCentroCosto[]>
  cerrar: string[];
  fechaCorte: string;
  arrConcluir: mOrdenCompra[];
  cerrados: any[];

  loading: boolean;

  listado$: Observable<any>;

  constructor(
    private _sCentroCosto: sCentroCosto,
    private OrdenCompra: sOrdenComra,
    private OrdenPedido: sOrdenPedido,
    private Cierre: sCierre
  ) {
    this.limpiar()
  }

  ngOnInit() {
    $(".date").datetimepicker({ format: "DD/MM/YYYY" });
    this.getCierres();
  }

  getCierres() {
    this.listado$.subscribe(allCerrados => {
      this.listado.emit(allCerrados);
      let allOrdenes = allCerrados.map(el => ({ agno: el.agno, allOC: el.OC.concat(el.OP).filter(el => el.ingresoEgreso == 1) }))
      this.cerrados = allOrdenes.reduce((acc, el) => acc.concat(el.allOC), [])
      // console.log(this.cerrados);
    })
  }

  filtraCierresCentroCosto(centroCosto): number {
    if (this.cerrados) {
      let cierresCentroCosto = this.cerrados.filter(el => el.subCentroCosto == centroCosto)
      let totalCentroCosto = this.OrdenCompra.retMontoNetoSinConfirmar(cierresCentroCosto)
      let totalAllOrdenesCentro = this.totales.find(el => el.nombre == centroCosto) ? this.totales.find(el => el.nombre == centroCosto).totalCentro : 0;
      // console.log(centroCosto, totalCentroCosto, totalAllOrdenesCentro);
      let usado = Math.ceil(totalAllOrdenesCentro ? totalCentroCosto * 100 / totalAllOrdenesCentro : 0)
      return 100 - usado;
    }
    return 0;
  }

  activate(centroCosto: mCentroCosto) {
    if (this.cerrar.includes(centroCosto.nombre))
      this.cerrar.splice(this.cerrar.findIndex(el => el == centroCosto.nombre), 1)
    else
      this.cerrar.push(centroCosto.nombre)
    // console.log(this.cerrar);
    this.selectCentro.emit(this.cerrar)
  }

  isActive(centroCosto: mCentroCosto): boolean {
    // console.log(this.cerrar);
    if (this.cerrar.includes(centroCosto.nombre))
      return true;
    else
      return false;
  }

  AsignaFechaCorte() {
    this.fechaCorte = this.ReturnFecha($('#txtfechaCorte'))
    // console.log(this.fechaCorte);
  }

  ReturnFecha(objHtml: any) {
    let dia = objHtml.val().split("/")[0];
    let mes = objHtml.val().split("/")[1];
    let agno = objHtml.val().split("/")[2];
    return agno + "-" + mes + "-" + dia + "T00:00:00";
  }

  limpiar() {
    this.listado$ = this.Cierre.getCierre();
    this.centroCosto$ = this._sCentroCosto.getCentroCosto();
    this.cerrar = [];
    this.arrConcluir = [];
    this.loading = false;
  }

  concluir() {
    let arrObservable: Observable<any>[] = [];
    let arrObservablePedido: Observable<any>[] = [];
    // this.arrConcluir = [];
    this.loading = true;
    let cierre = { _id: null, agno: this.agno, OC: null, OP: null };
    if (!this.fechaCorte) {
      let fecha = new Date()
      this.fechaCorte = fecha.getFullYear() + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0') + "T00:00:00";
    }
    // console.log(this.fechaCorte);

    this.cerrar.forEach(centroCosto => {
      arrObservable.push(this.OrdenCompra.getOrdenComprabyCentroCosto(centroCosto));
      arrObservablePedido.push(this.OrdenPedido.getOrdenPedidobyCentroCosto(centroCosto));
    });
    forkJoin(...arrObservable).subscribe(res => {
      // let mapa = res.map(el => el.filter(fil => new Date(this.retEstadoPagoMayor(fil.estadosPagos)) <= new Date(this.fechaCorte)))
      let mapa = res
        .map(el => el
          .filter(fil => fil.estadosPagos
            .filter(element => new Date(element.fecha) <= new Date(this.fechaCorte)).length)
          .map(mapa => ({ ...mapa, estadosPagos: this.retEP(mapa.estadosPagos) })));
      let redu = mapa.reduce((acc, el) => acc.concat(el), []);
      // this.arrConcluir.push(redu);
      cierre.OC = redu;
      this.cerrarEP(res[0], cierre.OC, 1)
      forkJoin(...arrObservablePedido).subscribe(Pedido => {
        // let mapa2 = Pedido.map(el => el.filter(fil => new Date(this.retEstadoPagoMayor(fil.estadosPagos)) <= new Date(this.fechaCorte)))
        let mapa2 = Pedido
          .map(el => el
            .filter(fil => fil.estadosPagos
              .filter(element => new Date(element.fecha) <= new Date(this.fechaCorte)).length)
            .map(mapa => ({ ...mapa, estadosPagos: this.retEP(mapa.estadosPagos) })));
        let redu2 = mapa2.reduce((acc, el) => acc.concat(el), []);
        // this.arrConcluir.push(redu2);
        cierre.OP = redu2;
        this.cerrarEP(Pedido[0], cierre.OP, 2)

        this.Cierre.getCierreByAgno(this.agno).subscribe(cierreHistorico => {
          // console.log(res);
          if (cierreHistorico.length) {
            console.log(cierreHistorico);

            cierreHistorico[0].OC.length ? cierreHistorico[0].OC = cierreHistorico[0].OC.concat(cierre.OC).filter(this.onlyUnique) : cierreHistorico[0].OC = cierre.OC;
            cierreHistorico[0].OP.length ? cierreHistorico[0].OP = cierreHistorico[0].OP.concat(cierre.OP).filter(this.onlyUnique) : cierreHistorico[0].OP = cierre.OP;
            console.log(cierreHistorico);
            this.Cierre.putBolsa(cierreHistorico[0]).subscribe(res => {
              // console.log(res)
              this.loading = false;
              this.reload.emit(null);
            });
          } else {
            this.Cierre.postBolsa(cierre).subscribe(res => {
              // console.log(res)
              this.loading = false;
              this.reload.emit(null);
            });
          }
        });
      });
    });
  }

  // retPoseeFechaEnRango(el, i, arr): boolean {
  //   return el.estadosPagos.filter(element => new Date(element.fecha) <= new Date(this.fechaCorte)).length;
  //   // fil => 
  //   //                     fil.estadosPagos.filter(element => 
  //   //                       new Date(element.fecha) <= new Date(this.fechaCorte)).length
  // }

  cerrarEP(OC, cierre, tipo: number) {
    let ordenes = OC.filter(ordenes => {
      if (cierre.map(el => el._id).includes(ordenes._id)) {
        ordenes.estadosPagos = ordenes.estadosPagos.map(el => {
          if (el.fecha && new Date(el.fecha) <= new Date(this.fechaCorte))
            return { ...el, cerrado: true }
          else
            return { ...el }
        })
        return true
      }
      return false
    });
    ordenes.forEach(orden => {
      if (tipo == 1)
        this.OrdenCompra.putOrdenCompra(orden).subscribe(el => console.log(el))
      else
        this.OrdenPedido.putOrdenPedido(orden).subscribe(el => console.log(el))
    });
  }

  retEP(estadoPagos: any[]): any[] {
    return estadoPagos.filter(el => el.fecha && new Date(el.fecha) <= new Date(this.fechaCorte) && !el.cerrado);
  }

  retEstadoPagoMayor(arr: any[]) {
    let fecha = null;
    arr.forEach(el => {
      if (new Date(fecha) <= new Date(el.fecha))
        fecha = el.fecha
    });
    return fecha
  }

  onlyUnique(value, index, self) {
    return self.findIndex(el => el._id === value._id) === index;
  }

}
