import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { mProfesional } from '../../../models/mProfesional';
import { sProfesionales } from '../../../services/sProfesionales.service';
import { sCajaChica } from '../../../services/sCajaChica';
import { profesionalService } from '../../../services/Nest/profesionalesService.service';
import { Profesional, profesionalDTO } from '../../../models/nestProfesional';
import { Observable } from 'rxjs';

declare var Swal: any;

@Component({
  selector: 'app-resumen-profesional',
  templateUrl: './resumen-profesional.component.html',
  styleUrls: ['./resumen-profesional.component.css'],
  providers: [profesionalService, sProfesionales]
})
export class ResumenProfesionalComponent implements OnInit {

  saldo$: Observable<profesionalDTO[]>;

  tblSaldo: Array<any>;

  constructor(
    private profesionalService: profesionalService,
    private _sProfesionales: sProfesionales,
    private _sCajaChica: sCajaChica
  ) {
    this.init();
  }

  init() {
    this.saldo$ = this.profesionalService.getResumenProfesional();

    // this._sProfesionales.getProfesionales().subscribe(profesionales => {
    //   // console.log(profesionales);

    //   this.tblSaldo = this._sCajaChica.retCajasArr(profesionales);
    //   this.tblSaldo.forEach((profesional, i) => {
    //     // console.log(profesional);

    //     this._sCajaChica.getCajaChicaByProfesional(profesional.id).subscribe(el => {
    //       // console.log(`-------------${profesional.nombre}----------------`);
    //       // console.log(el.filter(e => e.tipo == 1));
    //       // console.log(el.filter(e => e.tipo == 1).reduce((acc, e) => e.estado == 1 ? ++acc : acc, 0));
    //       this.tblSaldo[i] = { ...profesional, pendiente: el.filter(e => e.tipo == 1).reduce((acc, e) => e.estado == 1 ? ++acc : acc, 0) }
    //     });
    //     // console.log(this.tblSaldo);
    //   });


    // })
  }

  ngOnInit() {
  }

  dropProfesional(profesional: profesionalDTO) {
    // let profesionalDrop: mProfesional;
    // if (this._sProfesionales.getAllProf())
    //   profesionalDrop = this._sProfesionales.getAllProf().find(prof => prof.nombre == profesional.nombre)
    // console.log(profesionalDrop);
    if (this.validaSaldo(profesional)) {
      this.solicitaConfirmacion().then((result) => {
        if (result.value)
          this.eliminaPersonal(profesional);
      });
    }
    else
      Swal.fire(
        'Personal',
        'No se puede eliminar un personal con saldo disponible',
        'error'
      );
  }

  validaSaldo(prof): boolean {
    if (prof.saldo == 0)
      return true
    return false
  }

  solicitaConfirmacion() {
    return Swal.fire({
      title: 'Personal',
      text: "¿Esta seguro que desea eliminar el personal?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    });
  }

  eliminaPersonal(prof: profesionalDTO) {
    this.profesionalService.deleteProfesional(prof).subscribe(res => {
      Swal.fire(
        'Personal',
        'Se ha eliminado de forma correcta el personal',
        'success'
      );
      this.init();
    });
  }

  findPendiente(nombreProfesional: string) {
    return this.tblSaldo.find(el => el.nombre == nombreProfesional)
  }

}
