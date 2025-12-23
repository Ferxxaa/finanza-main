import { Injectable } from "@angular/core";
import {
    Http, Response, Headers,
    RequestMethod, RequestOptions,
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment"
import { BehaviorSubject } from 'rxjs';
import { mCajaChica } from "../models/mCajaChica";
import { mProfesional } from "../models/mProfesional";
import { sProfesionales } from "./sProfesionales.service";

declare var jQuery: any;
declare var $: any;

@Injectable()
export class sCajaChica {

    //   private allProfesionales: mProfesional[];
    //   private profesionalesBehavior = new BehaviorSubject<mProfesional[]>([])
    //   profesionales$ = this.profesionalesBehavior.asObservable();

    private allCajasChicas: mCajaChica[];
    private cajaChicasBehavior = new BehaviorSubject<Array<any>>([]);
    saldo$ = this.cajaChicasBehavior.asObservable();

    profesionales$;
    // private allCajasChicas: mCajaChica;

    constructor(
        public _http: Http,
        private _sProfesionales: sProfesionales
    ) {

        this.getCajasChicas().subscribe(cajasChicas => {
            this.allCajasChicas = cajasChicas;
            this.profesionales$ = this._sProfesionales.profesionales$;
            this.profesionales$.subscribe(prof => {
                this.actualizarSaldo(prof);
            });
        });
    }

    getCajasChicas(): Observable<mCajaChica[]> {
        return this._http
            .get(environment.node + "CajaChica")
            .map((res: Response) => res.json());
    }

    getCajaChicaId(id: string): Observable<mCajaChica> {
        return this._http
            .get(environment.node + "CajaChica/" + id)
            .map((res: Response) => res.json());
    }

    getCajaChicaByProfesional(profesionalId: string) {
        return this._http
            .get(environment.node + "CajaChica/profesional/" + profesionalId)
            .map((res: Response) => res.json());
    }

    postCajaChica(cajaChica: mCajaChica): any {
        this.allCajasChicas = [...this.allCajasChicas, cajaChica];
        this.actualizarSaldo(this._sProfesionales.getAllProf());
        return this._http
            .post(environment.node + "CajaChica/", cajaChica)
            .map((res: Response) => res.json());
    }

    putCajaChica(cajaChica: mCajaChica): any {
        this.allCajasChicas.splice(this.allCajasChicas.findIndex(el => el._id == cajaChica._id), 1, cajaChica);
        this.actualizarSaldo(this._sProfesionales.getAllProf());
        return this._http
            .put(environment.node + "CajaChica/" + cajaChica._id, cajaChica)
            .map((res: Response) => res.json());
    }

    deleteCajaChica(cajaChica: mCajaChica): any {
        return this._http
            .delete(environment.node + "CajaChica/" + cajaChica._id)
            .map((res: Response) => res.json());
    }

    /**************** Funciones ****************/

    private retTotalCajaChica(saldos: Array<mCajaChica>, profesionalId: string): number {
        let total: number = 0;
        if (saldos && saldos.length)
            // saldos.filter(cajaChica => cajaChica.profesional == profesionalId && cajaChica.estado != 2).forEach(saldo => {
            //     if (saldo.tipo == 1)
            //         total += saldo.monto;
            //     else
            //         total -= saldo.monto;
            // });
        return total
    }

    /**************** RXJS ****************/


    /**************** Gets ****************/
    retAllCajas() {
        return this.allCajasChicas;
    }

    retCajasArr(profesionales: mProfesional[]): Array<any> {
        let saldosCajas: Array<any> = [];
        let nombre: string, saldo: number;

        profesionales.forEach(profesional => {
            let id: string;
            id = profesional._id
            saldo = 0;
            nombre = profesional.nombre;
            if (profesional.saldo)
                saldo = profesional.saldo;
            saldo += this.retTotalCajaChica(this.allCajasChicas, id);
            saldosCajas.push({ id, nombre, saldo });
        });
        return saldosCajas;
    }

    actualizarSaldo(profesionales: mProfesional[]) {
        this.cajaChicasBehavior.next(this.retCajasArr(profesionales));
    }
}
