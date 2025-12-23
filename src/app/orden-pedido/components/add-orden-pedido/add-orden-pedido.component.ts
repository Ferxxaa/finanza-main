import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cotizacion } from '../../../models/nestCotizacion';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { OrdenCompra } from '../../../models/nestOrdenCompra';
import { Proveedor } from '../../../models/nestProveedor';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { OcItemComponent } from '../../../orden-compra/components/oc-item/oc-item.component';
import { nestProveedorService } from '../../../services/nestProfesional.service';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { estadoPagoService } from '../../../services/sEstadoPagoservice';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { subTipoGastoService } from '../../../services/sSubTipoGasto.service';
import { tipoGastoService } from '../../../services/sTipoGasto.service';
import { sVis_UsuarioPersona } from '../../../services/sVis_UsuarioPersona.service';
import { sCotizacion } from '../../../services/sCotizacion.service';
import { cotizacionService } from '../../../services/cotizacionService.service';

declare var $: any;

@Component({
  selector: 'app-add-orden-pedido',
  templateUrl: './add-orden-pedido.component.html',
  styleUrls: ['./add-orden-pedido.component.css'],
  providers: [
    nestProveedorService,
    sVis_UsuarioPersona,
    centroCostoService,
    tipoGastoService,
    subTipoGastoService,
    estadoPagoService,
    sMovimientoService,
    cotizacionService,
    sCotizacion
  ]
})
export class AddOrdenPedidoComponent implements OnInit {

  usuario: any;
  ordenPedido: OrdenCompra;
  cotizacion: Cotizacion;

  proveedorSelected: Proveedor | null;

  @ViewChild(OcItemComponent) ocItems: OcItemComponent;

  usuarios$: Observable<any[]>;
  proveedores$: Observable<Proveedor[]>;
  centroCostos$: Observable<CentroCosto[]>
  tiposGastos$: Observable<TipoGasto[]>
  subTiposGastos$: Observable<SubTipoGasto[]>

  private changeCotizacion: boolean;

  constructor(
    private proveedorService: nestProveedorService,
    private _Vis_UsuarioPersona: sVis_UsuarioPersona,
    private centroCostoService: centroCostoService,
    private tipoGastoService: tipoGastoService,
    private subTipoGastoService: subTipoGastoService,
    private estadoPagoService: estadoPagoService,
    private movimientoService: sMovimientoService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private cotizacionService: cotizacionService,
    private _sCotizacion: sCotizacion
  ) {
    this.usuario = JSON.parse(localStorage.usuario);
    this.proveedores$ = this.proveedorService.getProveedores();
    this.usuarios$ = this._Vis_UsuarioPersona.getVis_UsuarioPersona();
    this.centroCostos$ = this.centroCostoService.getCentroCosto();
    this.tiposGastos$ = this.tipoGastoService.getTiposGastos();
    this.clean();
  }

  ngOnInit() {
    this.cotizacion = this.cotizacionService.init();
    this.changeCotizacion = false;
    const self = this;
    $.getScript("https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.js", function (data, textStatus, jqxhr) {
      $("#drdProveedor").select2();
      $("#drdProveedor").change((e) => {
        self.AsignaProveedor($('#drdProveedor').find(':selected').val());
      })
    });
    this.clean()
  }

  ngAfterViewChecked() {
    this.getPadre();
    this.cdRef.detectChanges();
  }

  clean() {
    this.ordenPedido = {
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
    this.getPadre();
  }

  getPadre() {
    this.route.paramMap.subscribe(params => {
      this.ordenPedido.padre = Number(params.get('id'))
    });
  }

  AsignaProveedor(idProveedor) {
    this.proveedorService.getProveedorById(idProveedor).subscribe(res => {
      this.proveedorSelected = res;
      this.ordenPedido.proveedor = res.idProveedor;
      this.ordenPedido.categoria = res.categoria;
    });
  }

  getAreaNegocio() {
    this.centroCostoService.getCentroCostoById(this.ordenPedido.centroCosto).subscribe(res => this.ordenPedido.areaNegocio = res.areaNegocio.idAreaNegocio);
  }

  selectTipoGasto() {
    this.subTiposGastos$ = this.subTipoGastoService.getSubTipoGastoByIdTipoGasto(this.ordenPedido.tipoGasto);
  }

  NombreArchivo() {
    $("#NombreArch").html($("#fileupload1")[0].files[0].name);
    // console.log($("#fileupload1")[0].files[0]);
    this.cotizacion.nombreAdjunto = $("#fileupload1")[0].files[0].name;
    this.changeCotizacion = true;
  }

  asignaTotal(e) {
    if (this.ordenPedido.estadoPago) {
      const monto = e / this.ordenPedido.estadoPago.length;
      this.ordenPedido.estadoPago = this.ordenPedido.estadoPago.map(el => ({ ...el, monto: monto }));
    }
  }

  Agregar() {
    if (this.ordenPedido.estadoPago[0] && this.ordenPedido.estadoPago[0].fechaPago) {
      if (this.changeCotizacion) {
        this.cotizacion.estado = 2;
        this.cotizacion.areaNegocio = this.ordenPedido.areaNegocio;
        this.cotizacion.centroCosto = this.ordenPedido.centroCosto;
        this.cotizacion.solicitador = this.ordenPedido.idSolicitador ? this.ordenPedido.idSolicitador : this.cotizacion.solicitador;
        this.cotizacion.prioridad = Number(this.ordenPedido.prioridad);
        this._sCotizacion.AdjuntarArchivo($("#fileupload1")[0].files[0]).then((res: any) => {
          this.cotizacion.nombreAdjunto = res.files.adjuntar.originalFilename;
          this.cotizacionService.addCotizacion(this.cotizacion).subscribe(coti => {
            this.ordenPedido.cotizacion = coti.idCotizacion;
            this.movimientoService.addOrdenPedido(this.ordenPedido).subscribe(res => {
              this.clean()
            });
          });
        });
      }
      else {
        this.movimientoService.addOrdenPedido(this.ordenPedido).subscribe(res => {
          this.clean()
        });
      }
    } else {
      alert("Debe ingreser al menos una fecha")
    }
  }

}
