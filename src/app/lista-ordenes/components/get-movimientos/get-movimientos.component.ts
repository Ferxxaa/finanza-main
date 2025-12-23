import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ViewListadoMovimiento } from '../../../models/nestViewListadoMovimientos';
import { TiposMovimientos } from '../../../models/tiposMovimientos';
import { sCorreo } from '../../../services/sCorreo.service';
import { sViewListadoMovimientosService } from '../../../services/sViewListadoMovimientos';
import { sVis_UsuarioPersona } from '../../../services/sVis_UsuarioPersona.service';

@Component({
  selector: 'app-get-movimientos',
  templateUrl: './get-movimientos.component.html',
  styleUrls: ['./get-movimientos.component.css'],
  providers: [
    sViewListadoMovimientosService,
    sVis_UsuarioPersona,
    sCorreo
  ]
})
export class GetMovimientosComponent implements OnInit {

  viewListadoMovimientos$: Observable<ViewListadoMovimiento[]>;
  tiposMovimiento: TiposMovimientos;

  responsables: Array<any>;

  //PopUp
  idMovimiento: number;
  idMovimientoEP: number;
  egreso: number;
  ingreso: number;
  movEvaluar: number;

  constructor(
    private viewListadoMovimientoService: sViewListadoMovimientosService,
    private _Vis_UsuarioPersona: sVis_UsuarioPersona,
    private _sCorreo: sCorreo,
  ) {
    this.load();
    this._Vis_UsuarioPersona.fetchVis_UsuarioPersona().then((usuario) => {
      this.responsables = usuario;
    });
    this.movEvaluar = null;
  }

  load() {
    this.movEvaluar = null;
    this.tiposMovimiento = environment.tiposOC;
    this.viewListadoMovimientos$ = this.viewListadoMovimientoService.getViewListadoMovimientos();
  }

  ngOnInit() {
  }

  PopUp(flujo: ViewListadoMovimiento) {
    // console.log(flujo);

    switch (flujo.tipoOC) {
      case this.tiposMovimiento.ordenCompra:
        this.idMovimiento = flujo.idMovimiento;
        break;
      case this.tiposMovimiento.egreso:
        this.egreso = flujo.idMovimiento;
        break;
      case this.tiposMovimiento.ingreso:
        this.ingreso = flujo.idMovimiento;
        break;
      case this.tiposMovimiento.ordenPedido:
        this.idMovimientoEP = flujo.idMovimiento;
      default:
        break;
    }
  }

  getColor(flujo: ViewListadoMovimiento) {
    let total = 0;
    let promedio = 0;
    if (flujo.categoria == 1) {
      total =
        flujo.disponibilidad +
        flujo.precio +
        flujo.tiempo +
        flujo.calidad;
      promedio = total / 4;
    } else {
      total =
        flujo.disponibilidad +
        flujo.precio +
        flujo.tiempo +
        flujo.calidad +
        flujo.ssoma;
      promedio = total / 5;
    }
    return this.retColor(promedio);
  }

  retColor(promedio) {
    if (promedio >= 2.54) return "#64bd63";
    if (promedio < 2.54 && promedio >= 1.8) return "#f0b518";
    else return "#dd5826";
  }

  evaluar(flujo: ViewListadoMovimiento) {
    this.movEvaluar = flujo.idMovimiento;
  }

  sendMail(flujo: ViewListadoMovimiento) {
    let nombre: string = "";
    let correo;
    let send = {
      subject: nombre,
      messaje: correo,
      archivo: nombre,
      cotizacion: null,
      para: flujo.mail,
    };

    if (flujo.tipoOC == this.tiposMovimiento.ordenCompra) {
      send.archivo = `${flujo.folio}_${flujo.nombre}_${flujo.nombreCentroCosto}`
      send.subject = `${flujo.folio}_${flujo.nombre}_${flujo.nombreCentroCosto}`
      send.messaje = `Estimado,<br><br>Informamos a Ud que se ha creado una orden de compra N° ${flujo.folio}<br><br>
                  <a href="http://finanzas.trazas-nbi.com:3700/api/adjuntarOC/${nombre}">Orden de Compra</a>`;
    } else if (flujo.tipoOC == this.tiposMovimiento.ordenPedido) {
      send.archivo = `OP_${flujo.nombre}_${flujo.nombreCentroCosto}-OC_${flujo.folio}`
      send.subject = `OP_${flujo.nombre}_${flujo.nombreCentroCosto}-OC_${flujo.folio}`
      send.messaje = `Estimado,<br><br>Informamos a Ud que se ha creado una orden de pedido, 
                    la cual se encuenta asociada a la OC: ${flujo.folio}`;
    }

    if (flujo.idCotizacion) {
      send.cotizacion = flujo.nombreAdjunto;
      this._sCorreo.postCorreoAttach({ ...send }).subscribe((correo) => {
        this.updateSendMail(flujo);
      });
    } else {
      this._sCorreo.postCorreoAttach({ ...send }).subscribe((correo) => {
        this.updateSendMail(flujo);
      });
    }
    // console.log(send);

  }

  updateSendMail(flujo: ViewListadoMovimiento) {
    this.viewListadoMovimientoService.updateMovimientoMail(flujo.idMovimiento).subscribe((res) => {
      this.viewListadoMovimientos$ = null;
      this.viewListadoMovimientos$ = this.viewListadoMovimientoService.getViewListadoMovimientos();
    });
  }

}
