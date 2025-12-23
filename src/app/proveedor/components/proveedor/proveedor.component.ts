import { Component, OnInit, ViewChild } from "@angular/core";

import { sProveedor } from "../../../services/sProveedor.service";
import { sOrdenComra } from "../../../services/sOrdenComra.service";
import { Proveedor } from "../../../models/nestProveedor";
import { nestProveedorService } from "../../../services/nestProfesional.service";
import { Observable } from "rxjs";
import { buscadorProveedor } from "../../../models/buscadorProveedor";
import { EvaluacionMasivaComponent } from "../evaluacion-masiva/evaluacion-masiva.component";

declare var $: any;
declare var Swal: any;

@Component({
  selector: "app-proveedor",
  templateUrl: "./proveedor.component.html",
  styleUrls: ["./proveedor.component.css"],
  providers: [sProveedor, sOrdenComra, nestProveedorService],
})
export class ProveedorComponent implements OnInit {
  Proveedor: Proveedor;
  eProveedor: Proveedor;
  bolCrear: boolean;
  proveedores: Observable<Proveedor[]>;
  indexEdit: number;

  buscador: buscadorProveedor;
  p: number;

  //
  colapse: boolean;

  @ViewChild(EvaluacionMasivaComponent) evaluacionMasivaComponent;

  limpiar() {
    this.p = 1;
    this.Proveedor = this.proveedorService.init();
    this.eProveedor = this.proveedorService.init();
    this.buscador = { rut: null, nombre: null, categoria: 0, clave: null };
    this.colapse = false;
    this.proveedores = this.proveedorService.getProveedorByFilter(this.buscador);
  }

  constructor(
    private proveedorService: nestProveedorService,
  ) {
    this.limpiar();
    this.bolCrear = false;
  }

  ngOnInit() {
    console.clear();
    $('.rut').on('input', function () {
      var value = $(this).val().replace(/[^0-9kK]/g, ''); // Remueve cualquier caracter no numérico o 'K'
      var length = value.length;

      if (length <= 1) {
        $(this).val(value);
      } else if (length <= 4) {
        $(this).val(value.slice(0, length - 1) + '-' + value.slice(length - 1).toUpperCase());
      } else if (length <= 7) {
        $(this).val(value.slice(0, length - 4) + '.' + value.slice(length - 4, length - 1) + '-' + value.slice(length - 1).toUpperCase());
      } else {
        $(this).val(value.slice(0, length - 7) + '.' + value.slice(length - 7, length - 4) + '.' + value.slice(length - 4, length - 1) + '-' + value.slice(length - 1).toUpperCase());
      }
    });
    // this.TraeDatos();
  }

  validaProveedor() {
    // console.log(this.Proveedor);
    // if (this.proveedores) {
    //   this.existProveedor(this.Proveedor, this.proveedores);
    // } else {
    this.proveedorService.getProveedores().subscribe((res) => {
      this.existProveedor(this.Proveedor, res);
    })
    // }
  }

  private existProveedor({ rutProveedor }: Proveedor, listadoProv: Proveedor[]): void {
    rutProveedor = rutProveedor.includes("-") ? rutProveedor : rutProveedor.substr(0, 10) + '-' + rutProveedor.substr(10);
    // console.log(rutProveedor, listadoProv);
    if (listadoProv.find(el => el.rutProveedor == rutProveedor)) {
      Swal.fire(
        "Rut existente",
        "El rut ingresado ya se encuentra en el listado de proveedor",
        "error"
      );
      this.Proveedor.rutProveedor = '';
    }
  }

  // TraeDatos() {
  //   return new Promise((resolve, reject) => {
  //     this._sOrdenCompra.getOrdenCompra().subscribe((ordenCompra) => {
  //       this._sProveedor.getProveedor().subscribe((res) => {
  //         res.forEach((proveedor) => {
  //           proveedor.evaluacion = this.getEval(ordenCompra, proveedor.nombre);
  //         });
  //         resolve(res);
  //         this.proveedores = res;
  //       });
  //     });
  //   });
  // }

  colapsando() {
    if (!this.colapse) {
      $(".colapse").addClass("comprimido");
    } else {
      $(".colapse").removeClass("comprimido");
    }
    this.colapse = !this.colapse;
  }

  buscar() {
    if (this.buscador.rut && this.buscador.rut.indexOf("-") < 0) {
      const rut = this.buscador.rut
      this.buscador.rut = `${rut.substring(0, (rut.length - 1))}-${rut.substring(rut.length - 1)}`
    }
    this.proveedores = null;
    this.proveedores = this.proveedorService.getProveedorByFilter(this.buscador);
  }

  popUp(idProveedor: number) {
    this.proveedorService.getProveedorById(idProveedor).subscribe(res => {
      this.eProveedor = res;
    })
  }

  getEval(ordenCompra, nombre) {
    let evaluacion = 0;
    let ordenxProveedor = ordenCompra.filter(
      (oc) => oc.proveedor.nombre == nombre && oc.evaluacion != null
    );
    ordenxProveedor.forEach((orden) => {
      let prom;
      prom =
        orden.evaluacion.calidad +
        orden.evaluacion.disponibilidad +
        orden.evaluacion.precio +
        orden.evaluacion.tiempo +
        (orden.evaluacion.ssoma ? orden.evaluacion.ssoma : 0);
      evaluacion += prom / (orden.evaluacion.ssoma ? 5 : 4);
    });

    if (ordenxProveedor.length) {
      return evaluacion / ordenxProveedor.length;
    } else return 0;
  }

  getColor(evaluacion) {
    if (evaluacion >= 2.54) return "#64bd63";
    if (evaluacion < 2.54 && evaluacion >= 1.8) return "#f0b518";
    else return "#dd5826";
  }

  evaluar(rutProveedor: string = "18.407.137-1") {
    this.evaluacionMasivaComponent.activarEvaluacion(rutProveedor)
  }

  /********************************* CRUD *********************************/

  Agregar() {
    if (this.ValidaDatos())
      this.proveedorService.addProveedor(this.Proveedor).subscribe((res) => {
        this.ngOnInit();
        this.limpiar();
        Swal.fire(
          "Proveedor",
          "Se ha creado correctamente el proveedor",
          "success"
        );
      });
  }

  ValidaDatos(): Boolean {
    let bol = true;

    !this.Proveedor.rutProveedor ? (bol = false) : (bol = bol);
    !this.Proveedor.nombre ? (bol = false) : (bol = bol);
    !this.Proveedor.categoria ? (bol = false) : (bol = bol);
    !this.Proveedor.contacto ? (bol = false) : (bol = bol);
    !this.Proveedor.mail ? (bol = false) : (bol = bol);

    return bol;
  }

  Actualizar() {
    if (this.ValidaDatosEdit())
      this.proveedorService.addProveedor(this.eProveedor).subscribe((res) => {
        this.proveedores[this.indexEdit] = res;
        this.limpiar();
        Swal.fire(
          "Proveedor",
          "Se ha actualizado correctamente el proveedor",
          "success"
        );
      });
  }

  ValidaDatosEdit(): Boolean {
    let bol = true;

    !this.eProveedor.rutProveedor ? (bol = false) : (bol = bol);
    !this.eProveedor.nombre ? (bol = false) : (bol = bol);
    !this.eProveedor.categoria ? (bol = false) : (bol = bol);
    !this.eProveedor.contacto ? (bol = false) : (bol = bol);
    !this.eProveedor.mail ? (bol = false) : (bol = bol);

    return bol;
  }

  Eliminar() {
    const self = this;
    Swal.fire({
      title: "Proveedor",
      text: "¿Esta seguro de eliminar el proveedor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.value) self.Eliminando();
    });
  }

  Eliminando() {
    this.proveedorService.delProveedor(this.eProveedor).subscribe((res) => {
      // this.proveedores.splice(this.indexEdit, 1);
      this.limpiar();
      Swal.fire(
        "Proveedor",
        "Se ha eliminado correctamente el proveedor",
        "success"
      );
    });
  }
}
