import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatHistoricos'
})
export class ConcatHistoricosPipe implements PipeTransform {

  transform(value: any[]): any {
    if (value)
      return this.parseData(value).concat(this.addHistorico()).sort(this.orderReport)
    return this.addHistorico().sort(this.orderReport);
  }

  addHistorico() {
    let historico = [
      this.retObj('10-01-2015', '04-01-2016', 7, 'Remodelación Campamento Radales, Enel', '#000000', '#bdbdbd', 368474187, 297324552, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('05-01-2016', '12-01-2016', 8, 'Obras de Containers Bocamina, Enel', '#000000', '#bdbdbd', 425745834, 319475455, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('02-01-2016', '10-01-2016', 9, 'Remodelación COV de Bocamina, Enel', '#000000', '#bdbdbd', 591726185, 452451147, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('02-01-2017', '02-01-2017', 1, 'Fundación Huinay, Enel', '#000000', '#bdbdbd', 47584516, 25368774, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('01-01-2017', '05-01-2018', 17, 'Obra Cambio Vertical Sanitaria II, Enel', '#000000', '#bdbdbd', 495371707, 292723341, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('08-01-2017', '02-01-2018', 7, 'Remodelación Oficina Serrano, Enel', '#000000', '#bdbdbd', 422905827, 295243523, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('10-01-2017', '01-01-2018', 4, 'Planta de Tratamiento, Cepal', '#000000', '#bdbdbd', 112886631, 77883741, [], { id: 1, nombre: 'Construcción' }),
      // this.retObj('08-01-2018', '12-01-2018', 4, 'Tai Ping, Alimentos Formosa', '#000000', '#bdbdbd', 771823528, 325797286, []),
      this.retObj('12-01-2017', '04-01-2018', 5, 'Remodelación Edificio Imprenta, Cepal', '#000000', '#bdbdbd', 172702090, 156738747, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('11-01-2017', '05-01-2018', 7, 'Remodelación Baños, Hotel Atton', '#000000', '#bdbdbd', 109448633, 82705289, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('01-01-2018', '03-01-2018', 3, 'Remodelación Habitaciones, Hotel Atton', '#000000', '#bdbdbd', 205162456, 132150682, [], { id: 1, nombre: 'Construcción' }),
      this.retObj('02-01-2018', '03-01-2018', 2, 'Cowork Smartcity, Enel', '#000000', '#bdbdbd', 36590813, 16089900, [], { id: 1, nombre: 'Construcción' }),
      //Arq
      this.retObj('01-01-2016', '12-01-2016', 2, 'Proyectos Varios Arquitectura 2016', '#000000', '#bdbdbd', 185902414, 42504722, [], { id: 2, nombre: 'Arquitectura' }),
      this.retObj('01-01-2017', '12-01-2017', 2, 'Proyectos Varios Arquitectura 2017', '#000000', '#bdbdbd', 62315778, 20897787, [], { id: 2, nombre: 'Arquitectura' }),
      this.retObj('01-01-2018', '12-01-2018', 2, 'Proyectos Varios Arquitectura 2018', '#000000', '#bdbdbd', 41158949, 16542112, [], { id: 2, nombre: 'Arquitectura' }),
      this.retObj('01-01-2019', '12-01-2019', 2, 'Proyectos Varios Arquitectura 2019', '#000000', '#bdbdbd', 11753806, 2830101, [], { id: 2, nombre: 'Arquitectura' }),
    ]
    return historico
    // if (this.data && this.data.length)
    //   this.desplegar = this.data.concat(historico).sort((a, b) =>
    //     (new Date(a.antigua).getFullYear() < new Date(b.antigua).getFullYear()) || (new Date(a.antigua).getFullYear() == new Date(b.antigua).getFullYear() && new Date(a.antigua).getMonth() < new Date(b.antigua).getMonth()) ? 1 : -1
    //   );
    // this.original = this.desplegar;
    // console.log(this.original);

  }

  private retObj(antigua, nueva, duracion, nombrecc, letrascc, fondocc, ingresos, totalOrden, ordenes, areaNegocio, ivaCredito: number = 0, porcentajeIvaCredito: number = 0) {
    return {
      antigua: antigua,
      nueva: nueva,
      duracion: duracion,
      centroCosto: {
        nombre: nombrecc,
        letras: letrascc,
        fondo: fondocc
      },
      ingresos: ingresos,
      totalOrden: totalOrden,
      ordenes: ordenes,
      areaNegocio: areaNegocio,
      ivaCredito: ivaCredito,
      porcentajeIvaCredito: porcentajeIvaCredito
    }
  }

  parseData(dataDB: any[]): any[] {
    const dataParse = dataDB.map(el => {
      // const antigua = this.parseDate(el.inicio);
      // const nueva = this.parseDate(el.termino);

      return { ...this.retObj(el.fechaInicio ? el.fechaInicio : el.inicio, el.fechaTermino ? el.fechaTermino : el.termino, el.meses, el.nombreCentroCosto, el.letras, el.fondo, el.contratos, el.sumaEP, [], { id: el.idAreaNegocio, nombre: el.nombreAreaNegocio }, el.ivaCredito, el.ivaCreditoPorcentaje), idCentroCosto: el.idCentroCosto, sumaEP: Number(el.sumaEP) }
    })
    return dataParse
  }

  orderReport(a: any, b: any): number {
    const fecha1: Date = new Date(a.nueva)
    const fecha2: Date = new Date(b.nueva)
    return fecha1.getTime() <= fecha2.getTime() ? 1 : -1;
  }

  // private parseDate(fecha: string) {
  //   const month: string = String(new Date(fecha).getMonth() + 1)
  //   const year = new Date(fecha).getFullYear()
  //   return `${month.padStart(2, '0')}/${year}`
  // }

}
