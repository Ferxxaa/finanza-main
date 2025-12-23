export class mCuentas{

    constructor(
        public _id: string,
        public nombre: string,
        public rut: string,
        public razonSocial: string,
        public montoDisponible: number,
        public montoUtilizado: number,
        public saldo: number,
        public fechaCreacion: Date
    ){}

}
