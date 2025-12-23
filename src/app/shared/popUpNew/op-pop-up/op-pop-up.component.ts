import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { CondicionPopUpComponent } from '../condicion-pop-up/condicion-pop-up.component';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { Movimiento, MovimientoRelationShip } from '../../../models/movimiento';
import { EstadoPago } from '../../../models/nestEstadoPago';

@Component({
  selector: 'app-op-pop-up',
  templateUrl: './op-pop-up.component.html',
  styleUrls: ['./op-pop-up.component.css'],
  providers: [sMovimientoService]
})
export class OpPopUpComponent implements OnInit {

  @Input() idMovimiento: number;
  @Output() close = new EventEmitter()
  @Output() update = new EventEmitter()

  @ViewChild(CondicionPopUpComponent) estadoPagoComponent: CondicionPopUpComponent;

  movimiento$: Observable<MovimientoRelationShip>
  padre$: Observable<MovimientoRelationShip>
  movimiento: MovimientoRelationShip | null;
  bolAnular: boolean;

  isAprobador: boolean;

  constructor(
    private movimientoService: sMovimientoService,
    private _sOrdenCompra: sOrdenComra
  ) {
    this.movimiento = null;
    this.isAprobador = false;
  }

  ngOnInit() {
    this.setAprobador();
    this.movimiento$ = this.movimientoService.getMovimientoById(this.idMovimiento);
    this.movimiento$.subscribe(res => {
      this.movimiento = res;
      this.padre$ = this.movimientoService.getMovimientoById(this.movimiento.padre);
      const estadoPagosActivos: EstadoPago[] = this.movimiento.estadoPago.filter(el => el.estado == environment.estadoEP.Pagado)
      this.bolAnular = !(estadoPagosActivos.length > 0)
    })
  }

  loadTotalPadre(padre: MovimientoRelationShip): number {
    const totalEP: number = padre.estadoPago.reduce((acc, el) => acc + (el.estado == environment.estadoEP.Comprometido || el.estado == environment.estadoEP.ordenCompra ? el.monto : 0), 0);
    return totalEP
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
    });
  }

  firmar() {
    this.movimientoService.aprobarMovimiento(this.movimiento).subscribe(res => {
      this.genPDF(this.movimiento);
      this.Cerrar();
    });
  }

  rechazar() {
    this.movimientoService.rechazarMovimiento(this.movimiento).subscribe(res => {
      this.Cerrar();
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

}
