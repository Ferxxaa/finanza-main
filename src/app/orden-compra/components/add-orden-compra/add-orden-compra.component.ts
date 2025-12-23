import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { Cotizacion } from '../../../models/nestCotizacion';
import { EstadoPago } from '../../../models/nestEstadoPago';
import { OrdenCompra } from '../../../models/nestOrdenCompra';
import { Proveedor } from '../../../models/nestProveedor';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { cotizacionService } from '../../../services/cotizacionService.service';
import { nestProveedorService } from '../../../services/nestProfesional.service';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { estadoPagoService } from '../../../services/sEstadoPagoservice';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { subTipoGastoService } from '../../../services/sSubTipoGasto.service';
import { tipoGastoService } from '../../../services/sTipoGasto.service';
import { sVis_UsuarioPersona } from '../../../services/sVis_UsuarioPersona.service';
import { OcItemComponent } from '../oc-item/oc-item.component';
import { RadEstadoPagoComponent } from '../rad-estado-pago/rad-estado-pago.component';


declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-add-orden-compra',
  templateUrl: './add-orden-compra.component.html',
  styleUrls: ['./add-orden-compra.component.css'],
  providers: [
    nestProveedorService,
    sVis_UsuarioPersona,
    centroCostoService,
    tipoGastoService,
    subTipoGastoService,
    estadoPagoService,
    sMovimientoService,
    cotizacionService
  ]
})
export class AddOrdenCompraComponent implements OnInit {

  usuario: any;
  cotizacion: Cotizacion;
  ordenCompra: OrdenCompra;

  proveedorSelected: Proveedor | null;

  //Child
  @ViewChild(OcItemComponent) ocItems: OcItemComponent;
  @ViewChild(RadEstadoPagoComponent) ocEP: RadEstadoPagoComponent;

  //Select
  usuarios$: Observable<any[]>;
  proveedores$: Observable<Proveedor[]>;
  centroCostos$: Observable<CentroCosto[]>
  tiposGastos$: Observable<TipoGasto[]>
  subTiposGastos$: Observable<SubTipoGasto[]>

  constructor(
    private proveedorService: nestProveedorService,
    private _Vis_UsuarioPersona: sVis_UsuarioPersona,
    private centroCostoService: centroCostoService,
    private tipoGastoService: tipoGastoService,
    private subTipoGastoService: subTipoGastoService,
    private cdRef: ChangeDetectorRef,
    private estadoPagoService: estadoPagoService,
    private movimientoService: sMovimientoService,
    private cotizacionService: cotizacionService
  ) {
    this.usuario = JSON.parse(localStorage.usuario);
    this.cotizacion = null;
    this.clean();
    this.proveedores$ = this.proveedorService.getProveedores();
    this.usuarios$ = this._Vis_UsuarioPersona.getVis_UsuarioPersona();
    this.centroCostos$ = this.centroCostoService.getCentroCosto();
    this.tiposGastos$ = this.tipoGastoService.getTiposGastos();
  }

  clean() {
    if (localStorage.hasOwnProperty("cotizacion")) {
      this.cotizacion = JSON.parse(localStorage.cotizacion);
      localStorage.removeItem("cotizacion");
      this.ordenCompra = {
        idMovimiento: null,
        folio: 0,
        metodoPago: '0',
        descripcion: this.cotizacion.observacion,
        despacho: '',
        estado: 1,
        prioridad: this.cotizacion.prioridad.toString(),
        correo: false,
        tipo: 1,
        categoria: 0,
        idCreador: this.usuario.idUsuario,
        idAprobador: null,
        idSolicitador: this.cotizacion.solicitador,
        padre: null,
        condicionPago: null,
        motivoRechazo: null,
        isActive: true,
        fechaCreacion: new Date(),
        empresa: 3,
        cotizacion: this.cotizacion.idCotizacion,
        proveedor: 0,
        areaNegocio: this.cotizacion.areaNegocio.idAreaNegocio,
        centroCosto: this.cotizacion.centroCosto.idCentroCosto,
        tipoGasto: 0,
        subTipoGasto: 0,
        item: [],
        estadoPago: [this.estadoPagoService.retNewEp()],
        iva: 0,
        boleta: 0
      }
    } else {
      this.ordenCompra = {
        idMovimiento: null,
        folio: 0,
        metodoPago: '0',
        descripcion: '',
        despacho: '',
        estado: 1,
        prioridad: '0',
        correo: false,
        tipo: 1,
        categoria: 0,
        idCreador: this.usuario.idUsuario,
        idAprobador: null,
        idSolicitador: 0,
        padre: null,
        condicionPago: null,
        motivoRechazo: null,
        isActive: true,
        fechaCreacion: new Date(),
        empresa: 3,
        cotizacion: null,
        proveedor: 0,
        areaNegocio: 0,
        centroCosto: 0,
        tipoGasto: 0,
        subTipoGasto: 0,
        item: [],
        estadoPago: [this.estadoPagoService.retNewEp()],
        iva: 0,
        boleta: 0
      }
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    const self = this;
    $.getScript("https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.js", function (data, textStatus, jqxhr) {
      $("#drdProveedor").select2();
      $("#drdProveedor").change((e) => {
        self.AsignaProveedor($('#drdProveedor').find(':selected').val());
      })
    });
    this.letrasBlancasFolio();
  }

  letrasBlancasFolio() {
    $('#content').scroll(function () {
      if ($('#content').scrollTop() > 50) {
        $('.Folio').addClass('white');
      } else {
        $('.white').removeClass('white');
      }
    });
  }

  AsignaProveedor(idProveedor) {
    this.proveedorService.getProveedorById(idProveedor).subscribe(res => {
      console.log(res);
      
      this.proveedorSelected = res;
      this.ordenCompra.proveedor = res.idProveedor;
      this.ordenCompra.categoria = res.categoria;
    });
  }

  selectTipoGasto() {
    this.subTiposGastos$ = this.subTipoGastoService.getSubTipoGastoByIdTipoGasto(this.ordenCompra.tipoGasto);
  }

  Agregar() {
    if (this.ordenCompra.estadoPago[0] && this.ordenCompra.estadoPago[0].fechaPago) {
      if (this.cotizacion) {
        this.cotizacion.estado = 2;
        this.cotizacionService.updateCotizacion(this.cotizacion).subscribe();
      }
      this.calculaIVA();
      this.calculaBoleta();
      this.ordenCompra.estadoPago = this.ordenCompra.estadoPago.map(el => ({ ...el, metodoPago: Number(this.ordenCompra.metodoPago) }))
      this.movimientoService.addOrdenCompra(this.ordenCompra).subscribe(res => {
        this.clean()
        Swal.fire("Orden de Compra", "Se ha creado correctamente", "success");
      });
    } else {
      Swal.fire("Orden de Compra", "Debe ingreser al menos una fecha", "error");
    }
  }

  calculaIVA() {
    this.ordenCompra.iva = this.ordenCompra.item.filter(el => el.tipoDeclaracion == environment.declaracion.afecto).reduce((acc, el) => acc + (el.cantidad * el.precioUnitario * environment.iva), 0)
  }

  calculaBoleta() {
    this.ordenCompra.boleta = this.ordenCompra.item.filter(el => el.tipoDeclaracion == environment.declaracion.boleta).reduce((acc, el) => acc + (el.cantidad * el.precioUnitario * environment.boleta), 0)
  }

  asignaTotal(e) {
    const monto = e / this.ordenCompra.estadoPago.length;
    this.ordenCompra.estadoPago = this.ordenCompra.estadoPago.map(el => ({ ...el, monto: monto }));
  }

  getAreaNegocio() {
    this.centroCostoService.getCentroCostoById(this.ordenCompra.centroCosto).subscribe(res => this.ordenCompra.areaNegocio = res.areaNegocio.idAreaNegocio);
    // this.centroCostos$.subscribe(res => {
    //   console.log(res.find(el => el.idCentroCosto == this.ordenCompra.centroCosto));
    // })
  }

}
