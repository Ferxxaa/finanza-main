import { Component, OnInit } from '@angular/core';
import { sCotizacion } from '../../../services/sCotizacion.service';

import { sCentroCosto } from '../../../services/sCentroCosto.service'
import { sCorreo } from '../../../services/sCorreo.service';

import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { cotizacionService } from '../../../services/cotizacionService.service';
import { Cotizacion } from '../../../models/nestCotizacion';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AreaNegocio } from '../../../models/nestAreaNegocio';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { areaNegocioService } from '../../../services/Nest/areaNegocioService.service';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';


declare var $: any;

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  providers: [
    sCotizacion,
    sCentroCosto,
    sCorreo,
    sOrdenComra,
    cotizacionService,
    areaNegocioService,
    centroCostoService
  ]
})
export class CotizacionComponent implements OnInit {

  cotizacion: Cotizacion;
  usuario: any;

  AreasNegocios$: Observable<AreaNegocio[]>;
  centrosCostos$: Observable<CentroCosto[]>;

  centrosCostos: Array<any>;

  mensaje: any;

  constructor(
    private _sCotizacion: sCotizacion,
    private _sCorreo: sCorreo,
    private _sOrdenCompra: sOrdenComra,
    private cotizacionService: cotizacionService,
    private areaNegocioService: areaNegocioService,
    private centroCostoService: centroCostoService
  ) {
    this.mensaje = { ok: null, error: null };
    this.usuario = JSON.parse(localStorage.usuario);
    this.cotizacion = { idCotizacion: null, prioridad: 0, nombreAdjunto: null, observacion: null, estado: 1, solicitador: this.usuario.idUsuario, isActive: true, fechaCreacion: new Date(), empresa: environment.empresa, areaNegocio: 0, centroCosto: 0 };
    this.AreasNegocios$ = this.areaNegocioService.getAreasNegocio();
    this.limpiar();
  }

  ngOnInit() {
    console.clear();
  }

  validaOcSinEvaluar(solicitante: string) {
    this._sOrdenCompra.getOrdenComprabySolicitante(solicitante).subscribe(cantidad => {
      alert("Cantidad OC sin evaluar: " + cantidad.cantidad);
    });
  }

  limpiar() {
    // this._sCotizacion.getCotizacion().subscribe(res => {
    // })
    this.cotizacion = { idCotizacion: null, prioridad: 0, nombreAdjunto: null, observacion: null, estado: 1, solicitador: this.usuario.idUsuario, isActive: true, fechaCreacion: new Date(), empresa: environment.empresa, areaNegocio: 0, centroCosto: 0 };
    $("#NombreArch").html("");
    $("#fileupload1").val('')
  }

  NombreArchivo() {
    $("#NombreArch").html($("#fileupload1")[0].files[0].name);
    // console.log($("#fileupload1")[0].files[0]);
    this.cotizacion.nombreAdjunto = $("#fileupload1")[0].files[0].name;
  }

  guardar() {
    // console.log(this.cotizacion);
    this._sCotizacion.AdjuntarArchivo($("#fileupload1")[0].files[0]).then((res: any) => {
      // this.cotizacion.adjunto = res.files.adjuntar.path.split("\\")[5];
      // this.cotizacion.nombreAdjunto = res.files.adjuntar.originalFilename;
      this.cotizacion.nombreAdjunto = `${res.files.adjuntar.originalFilename}`;
      this.cotizacionService.addCotizacion(this.cotizacion).subscribe(res => {
        // console.log(res);
        let prioridad
        if (this.cotizacion.prioridad == 1)
          prioridad = "Baja"
        else if (this.cotizacion.prioridad == 2)
          prioridad = "Media"
        else
          prioridad = "Alta"

        this._sCorreo.postCuentas({
          subject: 'Nueva Cotización',
          para: 'osc.gomezr@gmail.com',
          // para: 'administracion@trazas.cl',
          messaje: `Estimado,<br><br>Informamos a Ud que se ha creado una nueva cotización para su gestión
        <br><br>
        <table><tr><td>Proriodad : </td><td>${prioridad}</td></tr>
        <tr><td>Solicita : </td><td>${this.cotizacion.solicitador}</td></tr>
        <tr><td>Centro Costo : </td><td>${this.cotizacion.centroCosto}</td></tr></table>
        <br><a href="http://finanzas.trazas-nbi.com/MisCotizaciones">Cotizaciones pendientes</a>`
        }).subscribe();

        this.limpiar();
        this.mensaje.ok = "Se ha creado correctamente la cotización";
      });
    });

  }

  getCentroCosto() {
    this.centrosCostos$ = this.centroCostoService.getCentroCostoByIdAreaNegocio(this.cotizacion.areaNegocio)
  }

  cerrarCorrecto() {
    this.mensaje = { ok: null, error: null };
  }

}
