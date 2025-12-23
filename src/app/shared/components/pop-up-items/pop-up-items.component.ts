import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { sOrdenPedido } from '../../../services/sOrdenPedido.service';
import { mOrdenPedido } from '../../../models/mOrdenPedido';
import { sCotizacion } from '../../../services/sCotizacion.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-pop-up-items',
  templateUrl: './pop-up-items.component.html',
  styleUrls: ['./pop-up-items.component.css'],
  providers: [
    sOrdenPedido,
    sCotizacion
  ]
})
export class PopUpItemsComponent implements OnInit {

  @Input() idOC?;
  @Input() items;
  @Input() iva;
  @Input() boleta;
  @Input() cotizacion?;

  totalOC: number;
  totalIVAOPs: number;

  IVACalculado: number;
  BoletaCalculado: number;

  url: string;
  adjunto: any;


  constructor(
    private _sOrdenPedido: sOrdenPedido,
    private _sCotizacion: sCotizacion
  ) {
    this.totalOC = 0;
    this.totalIVAOPs = 0;
    this.url = environment.node + "adjuntar/";
  }

  ngOnInit() {
    // console.log(this.items);
    this.totalOC = this.retTotalItem(this.items)
    if (this.idOC)
      this.getOPs(this.idOC)
    this.getCotizacion(this.cotizacion);
    this.IVACalculado = this.retIvaporItem(this.items);
    this.BoletaCalculado = this.retBoletaporItem(this.items);
    // console.log(this.IVACalculado);
    // console.log(this.BoletaCalculado);
  }

  getOPs(idOC: string) {
    this._sOrdenPedido.getOrdenPedidobyOrdenCompra(idOC).subscribe(OPs => {
      this.totalIVAOPs = this.retTotalIva(OPs)
    })
  }

  getCotizacion(idCotizacion: string) {
    if (idCotizacion) {
      this._sCotizacion.getCotizacionesbyID(idCotizacion).subscribe(cotizacion => {
        this.adjunto = cotizacion.adjunto;
      });
    }
  }

  retTotalItem(items: Array<any>): number {
    let total = 0;
    items.forEach(item => {
      total += (item.precioUnitario * item.cantidad);
    });
    return total;
  }

  retTotalIva(OrdenesPedido: mOrdenPedido[]) {
    let totalIVA = 0;
    OrdenesPedido.forEach(OP => {
      totalIVA = OP.iva;
    });
    return totalIVA
  }

  retIvaporItem(estadoPago: any[]): number {
    let epConIva = estadoPago.filter(el => el.iva == 2);
    // console.log(epConIva);
    // console.log(this.iva);
    
    if (epConIva.length)
      return epConIva.reduce((acc, el) => acc += el.precioUnitario * el.cantidad * environment.iva, 0)
    else
      return 0
  }

  retBoletaporItem(estadoPago: any[]): number {
    let epBoletas = estadoPago.filter(el => el.iva == 3);
    if (epBoletas.length)
      return epBoletas.reduce((acc, el) => acc += el.precioUnitario * environment.boleta, 0)
    else
      return 0
  }



}
