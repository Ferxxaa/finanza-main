interface Pagos {
    fechaPago: string;
    monto: number;
    gastado:number;
  }
  
  interface CentroCosto{
    _id:string,
    nombre:string,
    activo:boolean,
    fechaCreacion:string
  }
  
  interface SubCentro{
    nombre:string,
    responsable:string,
    activo:boolean,
    fondo:string,
    letras:string,
    montoProgramado:number
  }
  
  export class mIngreso {
    constructor(
      public _id: string,
      public idCentroCosto: string,
      public CentroCosto: CentroCosto,
      public subCentroCosto: SubCentro,
      public pagos: Pagos[]
    ) {}
  }