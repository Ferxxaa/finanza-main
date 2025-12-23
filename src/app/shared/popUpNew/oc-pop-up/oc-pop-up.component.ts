import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Movimiento, MovimientoRelationShip } from '../../../models/movimiento';
import { EstadoPago } from '../../../models/nestEstadoPago';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { CondicionPopUpComponent } from '../condicion-pop-up/condicion-pop-up.component';
import { PopUpMotivoComponent } from '../pop-up-motivo/pop-up-motivo.component';
import { PopUpTemplateComponent } from '../pop-up-template/pop-up-template.component';

declare var Swal: any;

@Component({
  selector: 'app-oc-pop-up',
  templateUrl: './oc-pop-up.component.html',
  styleUrls: ['./oc-pop-up.component.css'],
  providers: [sMovimientoService]
})
export class OcPopUpComponent implements OnInit {

  @Input() idMovimiento: number;
  @Output() close = new EventEmitter()
  @Output() update = new EventEmitter()

  @ViewChild(CondicionPopUpComponent) estadoPagoComponent: CondicionPopUpComponent;
  @ViewChild(PopUpMotivoComponent) motivoComponent: PopUpMotivoComponent;

  movimiento$: Observable<MovimientoRelationShip>
  movimiento: MovimientoRelationShip | null;
  bolAnular: boolean;

  isAprobador: boolean;

  fijarFlujoOC: boolean;

  constructor(
    private movimientoService: sMovimientoService,
    private _sOrdenCompra: sOrdenComra
  ) {
    this.movimiento = null;
    this.isAprobador = false;
    this.fijarFlujoOC = false;
  }

  ngOnInit() {
    
    this.setAprobador();
    this.movimiento$ = this.movimientoService.getMovimientoById(this.idMovimiento);
    this.bolAnular = true;
    this.movimiento$.subscribe(res => {
      this.movimiento = res;
      const estadoPagosActivos: EstadoPago[] = this.movimiento.estadoPago.filter(el => el.estado == environment.estadoEP.Pagado)
      // this.bolAnular = !(estadoPagosActivos.length > 0)
      this.bolAnular = true;
    }, error => {
      console.info(`Error al obtener el movimiento: ${this.idMovimiento}`)
      console.error(error);
      this.closeEvent();
    })
  }

  setAprobador() {
    if (localStorage.hasOwnProperty('perfiles')) {
      const perfilesExistentes = environment.perfiles;
      const perfiles: number[] = JSON.parse(localStorage.perfiles).map(el => el.idPerfil);
      this.isAprobador = perfiles.includes(perfilesExistentes.gerenteAdmin || perfilesExistentes.subgerente || perfilesExistentes.sistema)
    }
  }

  closeEvent() {
    this.close.emit();
  }

  guardar() {
    // console.log(this.movimiento);

    this.movimientoService.updateOC(this.movimiento).subscribe(res => {
      this.update.emit("Actualizado")
      this.Cerrar()
    });
    // this.estadoPagoComponent.updateEP();
  }

  Cerrar() {
    this.close.emit();
  }

  anular() {
    this.movimientoService.anularMovimiento(this.movimiento).subscribe(res => {
      console.log(res);
      this.update.emit("Actualizado")
      this.Cerrar()
    });
  }

  firmar() {
    this.movimientoService.aprobarMovimiento(this.movimiento).subscribe(res => {
      this.genPDF(this.movimiento);
      this.Cerrar();
    });
  }

  rechazar() {
    const self = this;
    Swal.fire({
      title: "Rechazando",
      text: "¿Esta seguro de rechazar la Orden de compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rechazar"
    }).then((result) => {
      if (result.value)
        self.rechazando();
    });
  }

  rechazando() {
    this.movimientoService.rechazarMovimiento({ ...this.movimiento, motivoRechazo: this.motivoComponent.motivo }).subscribe(res => {
      this.Cerrar();
      Swal.fire("Orden de Compra", "Se ha rechazado de forma correcta la orden de compra", "warning");
    });
  }

  genPDF(move: MovimientoRelationShip) {

    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    var pdf = this.movimientoService.RetPDF(move).output("blob");

    formData.append("adjuntar", pdf, move.folio + "_" + move.proveedor.nombre + "_" + move.centroCosto.nombreCentroCosto + ".pdf");

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4)
        if (xhr.status != 200)
          return null;
    };
    xhr.open("POST", environment.node + "adjuntarOC", true);
    xhr.send(formData);

  }

  fijarFlujoShow() {

  }

}
