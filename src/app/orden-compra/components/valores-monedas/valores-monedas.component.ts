import { Component, OnInit } from '@angular/core';
import { sMonedas } from '../../../services/sMonedas';

@Component({
  selector: 'app-valores-monedas',
  templateUrl: './valores-monedas.component.html',
  styleUrls: ['./valores-monedas.component.css'],
  providers: [sMonedas]
})
export class ValoresMonedasComponent implements OnInit {

  uf: number;
  usd: number;
  utm: number;
  euro: number;

  constructor(
    private monedas: sMonedas
  ) {
    this.uf = 0;
    this.usd = 0;
  }

  ngOnInit() {
    this.monedas.getMonedas().subscribe(res => this.asignaValoresMonedas(res))
  }

  asignaValoresMonedas({ uf, dolar, utm, euro }) {
    this.uf = uf.valor;
    this.usd = dolar.valor;
    this.utm = utm.valor;
    this.euro = euro.valor;
  }

}
