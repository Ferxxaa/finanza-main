import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { cotizacionService } from '../../../services/cotizacionService.service';
import { sMovimientoService } from '../../../services/sMovimiento.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [cotizacionService, sMovimientoService]
})
export class HeaderComponent implements OnInit {

  notifications: Array<{ title: string; body: string; link: string; createdAt: Date }> = [];
  unreadCount: number = 0; // total pendientes

  private userId: number = 0;
  private profileIds: number[] = [];

  private usuario: any = null;

  private pollSub: Subscription | null = null;

  constructor(
    private route: Router,
    private cotizacionesService: cotizacionService,
    private movimientoService: sMovimientoService
  ) {
    if (localStorage.hasOwnProperty('usuario')) {
      try {
        this.usuario = JSON.parse(localStorage.usuario);
        this.userId = Number(this.usuario.idUsuario || 0);
      } catch (e) {
        this.userId = 0;
      }
    }

    if (localStorage.hasOwnProperty('perfiles')) {
      try {
        this.profileIds = (JSON.parse(localStorage.perfiles) || []).map(el => Number(el.idPerfil));
      } catch (e) {
        this.profileIds = [];
      }
    }
  }

  ngOnInit() {
    this.refreshPending();

    // Polling para que sea "real" entre usuarios sin websockets
    this.pollSub = Observable.interval(30000).subscribe(() => this.refreshPending());
  }

  ngOnDestroy() {
    if (this.pollSub) {
      this.pollSub.unsubscribe();
      this.pollSub = null;
    }
  }

  openNotification(n: { title: string; body: string; link: string; createdAt: Date }, event: any) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();
    if (n.link) {
      this.route.navigate([n.link]);
    }
  }

  private refreshPending() {
    const isJefeAdmin = this.profileIds.includes(environment.perfiles.jefeAdministracion);
    const isGerenteAdmin = this.profileIds.includes(environment.perfiles.gerenteAdmin);

    const next: Array<{ title: string; body: string; link: string; createdAt: Date }> = [];
    let total = 0;
    const now = new Date();

    if (isJefeAdmin) {
      this.cotizacionesService.getCotizacionesPendientes().subscribe(list => {
        const count = (list || []).length;
        if (count > 0) {
          next.push({
            title: 'Cotizaciones pendientes',
            body: `Tienes ${count} cotización(es) pendiente(s) para gestionar.`,
            link: '/MisCotizaciones',
            createdAt: now
          });
          total += count;
        }

        // Se combina con lo que exista hasta ahora
        this.applyPendingSnapshot(next, total);
      });
    }

    if (isGerenteAdmin) {
      this.movimientoService.getPorAprobar().subscribe(list => {
        const onlyOC = (list || []).filter(m => Number(m.tipo) === environment.tiposOC.ordenCompra);
        const count = onlyOC.length;
        if (count > 0) {
          next.push({
            title: 'Órdenes de compra pendientes',
            body: `Tienes ${count} Orden(es) de Compra pendiente(s) de aprobación.`,
            link: '/Aprobacion',
            createdAt: now
          });
          total += count;
        }

        this.applyPendingSnapshot(next, total);
      });
    }

    // Si el usuario no tiene perfiles target, limpia
    if (!isJefeAdmin && !isGerenteAdmin) {
      this.notifications = [];
      this.unreadCount = 0;
    }
  }

  private applyPendingSnapshot(next: Array<{ title: string; body: string; link: string; createdAt: Date }>, total: number) {
    // Merge simple: evita duplicados por título
    const byTitle: { [k: string]: { title: string; body: string; link: string; createdAt: Date } } = {};
    next.forEach(n => (byTitle[n.title] = n));
    this.notifications = Object.keys(byTitle).map(k => byTitle[k]);
    this.unreadCount = total;
  }

  CerrarSesion(){
    localStorage.removeItem("usuario");
    this.route.navigate(['/Login']);
  }

}
