interface contrato{
    nombre:string;
    monto:number;
}

export class mSubCentroCosto{

    constructor(
        public nombre: string,
        public activo:boolean,
        public fondo:string,
        public letras:string,
        public responsable : Array<any>,
        public montoProgramado:number,
        public contrato:contrato[],
        public cliente?: Object,
        public solicita?: any,
        public periodo?:any
    ){}

}