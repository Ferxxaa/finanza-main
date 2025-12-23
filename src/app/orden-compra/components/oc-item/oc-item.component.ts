import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Cotizacion } from '../../../models/nestCotizacion';
import { Empresa } from '../../../models/Empresa';
import { EstadoPago } from '../../../models/nestEstadoPago';
import { Item } from '../../../models/nestItem';
import { empresaService } from '../../../services/empresaService.service';

declare var $: any;

@Component({
  selector: 'app-oc-item',
  templateUrl: './oc-item.component.html',
  styleUrls: ['./oc-item.component.css'],
  providers: [
    empresaService
  ]
})
export class OcItemComponent implements OnInit, OnChanges {

  @Input() item: Item[];
  @Input() estadoPago: EstadoPago[];
  @Input() cotizacion: Cotizacion;
  @Output() changeTotal = new EventEmitter<number>();
  @Output() changeItem = new EventEmitter<Item[]>();
  env: any;
  total: number;
  url: string;

  empresa$: Observable<Empresa>

  constructor(
    private empresaService: empresaService
  ) {
    this.env = { iva: 0, boleta: 0 };
    this.total = 0;
    this.empresa$ = this.empresaService.getEmpresaById(environment.empresa);
    this.url = environment.node + "adjuntar/";
  }

  ngOnInit() {
    if (this.cotizacion) {
      this.url = environment.node + "adjuntar/" + this.cotizacion.nombreAdjunto
    } else {
      this.url = null;
    }

    this.addItem()
    this.empresa$.subscribe(res => {
      this.env = { iva: res.valIVA, boleta: res.valBoleta };
      this.AsignaTotal();
    })
    this.AsignaTotal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.hasOwnProperty("item")) {
      // this.cambiaTodosMontos
      this.AsignaTotal();
    }
    if (changes.hasOwnProperty("idCotizacion") || changes.hasOwnProperty("cotizacion")) {
      console.log("Ingrese a Cotizacion");
      if (this.cotizacion) {
        this.url = environment.node + "adjuntar/" + this.cotizacion.nombreAdjunto
      }
      console.log("URL", this.url);
    }
    
  }

  addItem(linea?: number) {
    let add: Item = {
      codigo: null,
      detalle: null,
      cantidad: 1,
      declaracion: null,
      moneda: "CLP",
      precioUnitario: null,
      tipoDeclaracion: 2,
      isActive: true,
      fechaCreacion: new Date(),
      idItem: null
    };
    if (linea != undefined && linea != null) {
      if (
        !this.item[linea].codigo &&
        !this.item[linea].detalle &&
        this.item.length <= linea + 1
      )
        this.item.push(add);
    }
    else
      this.item.push(add);

  }

  AsignaTotal() {
    this.total = 0;
    this.item
      .filter((el) => el.precioUnitario)
      .forEach((item) => {
        const totalItem = item.precioUnitario * item.cantidad;
        switch (Number(item.tipoDeclaracion)) {
          case 2:
            item.declaracion = totalItem * (this.env.iva / 100)
            this.total += totalItem + item.declaracion;
            break;
          case 3:
            item.declaracion = totalItem * (this.env.boleta / 100)
            this.total += totalItem + item.declaracion;
            break;
          default:
            item.declaracion = 0;
            this.total += totalItem;
            break;
        }
      });
    this.changeItem.emit(this.item);
    this.changeTotal.emit(this.total);
    this.cambiaTodosMontos();
  }

  cambiaTodosMontos() {
    let indice = 0;
    let origin = this;
    $("[name='txtEstadoPagoMonto']").each(function () {
      origin.estadoPago[indice].monto = (origin.total * this.value) / 100;
      indice++;
    });
  }

}
