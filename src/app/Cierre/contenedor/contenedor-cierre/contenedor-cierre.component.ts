import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { ListadoCierreComponent } from '../../components/listado-cierre/listado-cierre.component';

@Component({
  selector: 'app-contenedor-cierre',
  templateUrl: './contenedor-cierre.component.html',
  styleUrls: ['./contenedor-cierre.component.css'],
  providers: [
    sCentroCosto,
    sOrdenComra
  ]
})
export class ContenedorCierreComponent implements OnInit {

  reload: boolean;
  cierres: boolean;

  centrosCosto$: Observable<mCentroCosto[]>

  totales: any[];

  @ViewChild(ListadoCierreComponent) listadoCentro: ListadoCierreComponent;

  constructor(
    private CentroCosto: sCentroCosto,
    private OrdenCompra: sOrdenComra
  ) {
    this.reload = true;
    this.cierres = false;
  }

  ngOnInit() {
    this.getCentroCosto();
  }

  restart() {
    this.reload = false;
    setTimeout(() => {
      this.reload = true;
    }, 500);
  }

  getCentroCosto() {
    this.centrosCosto$ = this.CentroCosto.getCentroCosto();
    this.centrosCosto$.subscribe(res => {
      let areasFuncionales = res.filter(el => !el.nombre.includes('Operacional'));
      let centroCosto = areasFuncionales.reduce((acc, el) => acc.concat(el.subCentroCosto), [])
      this.getOrdenesByCentroCosto(centroCosto);
    })
  }

  getOrdenesByCentroCosto(centroCosto: any[]) {
    this.OrdenCompra.getCuentaCorriente().subscribe(cuentaCorriente => {
      let arrTemp = [];
      centroCosto.forEach(centro => {
        let ordenesCentro = cuentaCorriente.filter(el => el.subCentro.nombre == centro.nombre && el.ingresoEgreso == 1);
        // console.log(centro.nombre, ordenesCentro);
        let totalCentro = this.OrdenCompra.retTotalCuentaCorriente(ordenesCentro);
        arrTemp.push({ nombre: centro.nombre, totalCentro });
      });
      this.totales = arrTemp;
    })
  }

  setCerrados(e) {
    this.listadoCentro.setValueCierres(e);
  }

  selectCentro(e) {
    this.listadoCentro.displayCentro(e)
  }

}
