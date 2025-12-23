import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"
import { Bolsa, BolsaAdd } from "../../models/nestBolsa"
import { PagosBolsa, PagosBolsaAdd } from "../../models/nestPagosBolsa"

@Injectable()
export class bolsaService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/bolsa'
    }

    init(): BolsaAdd {
        return { idBolsa: null, tipoBolsa: 0, isActive: true, fechaCreacion: new Date(), pagosBolsa: [{ fechaPago: new Date(), monto: null, gastado: 0, isActive: true, idPagoBolsa: null, fechaCreacion: new Date() }], tipoGastos: [], empresa: environment.empresa }
    }

    getBolsa(): Observable<Bolsa[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getBolsaById(idBolsa: number): Observable<Bolsa> {
        return this._http.get(`${this.context}/id/${idBolsa}`).map((res: Response) => res.json());
    }

    getBolsaByIdCentroCosto(idCentroCosto: number): Observable<Bolsa[]> {
        return this._http.get(`${this.context}/centroCosto/${idCentroCosto}`).map((res: Response) => res.json());
    }

    addBolsa(bolsa: BolsaAdd): Observable<Bolsa> {
        return this._http.post(`${this.context}/add`, bolsa).map((res: Response) => res.json());
    }

    parsePagosBolsaToPagosBolsa(pagosBolsa: PagosBolsa[]): PagosBolsaAdd[] {
        return pagosBolsa.map(el => {
            return { ...el, empresa: el.empresa ? el.empresa.idEmpresa : null, bolsa: el.bolsa ? el.bolsa.idBolsa : null }
        })
    }

    delBolsaById(idBolsa: number): Observable<Bolsa> {
        return this._http.get(`${this.context}/del/${idBolsa}`).map((res: Response) => res.json());
    }
}