import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

import { environment } from '../../../../environments/environment';
import { cotizacionService } from '../../../services/cotizacionService.service';
import { sMovimientoService } from '../../../services/sMovimiento.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [cotizacionService, sMovimientoService]
})
export class HeaderComponent implements OnInit {

  notifications: Array<{ title: string; body: string; link: string; createdAt: Date }> = [];
  unreadCount: number = 0; // pendientes NO vistos (derivado de conteos)

  isRefreshing: boolean = false;
  lastUpdatedAt: Date | null = null;

  viewMode: 'new' | 'all' = 'new';

  private userId: number = 0;
  private profileIds: number[] = [];

  private usuario: any = null;

  private pollSub: Subscription | null = null;
  private visibilityHandler: any = null;

  private initializedCounts: boolean = false;
  private lastCotizacionesCount: number = 0;
  private lastAprobacionOcCount: number = 0;
  private lastRechazadasOcCount: number = 0;
  private lastToastAtMs: number = 0;

  private currentCotizacionesCount: number = 0;
  private currentAprobacionOcCount: number = 0;
  private currentRechazadasOcCount: number = 0;

  private seenCotizacionesCount: number = 0;
  private seenAprobacionOcCount: number = 0;
  private seenRechazadasOcCount: number = 0;

  private readonly seenStorageKeyBase: string = 'finanza.notifications.seenCounts.v1';

  private profilesLoaded: boolean = false;
  private profilesLoading: boolean = false;

  constructor(
    private route: Router,
    private http: Http,
    private cotizacionesService: cotizacionService,
    private movimientoService: sMovimientoService
  ) {
    if (localStorage.hasOwnProperty('usuario')) {
      try {
        this.usuario = JSON.parse(localStorage.usuario);
        // Distintos módulos guardan distintas propiedades; intenta cubrir todas
        this.userId = Number(this.usuario.idUsuario || this.usuario.IdUsuario || this.usuario.id || this.usuario.Id || 0);
      } catch (e) {
        this.userId = 0;
      }
    }

    // Perfiles NO se leen desde localStorage: se cargan desde BD vía API

    this.loadSeenCountsFromStorage();
  }

  ngOnInit() {
    this.refreshPending();

    // Polling para que sea "real" entre usuarios sin websockets
    this.pollSub = Observable.interval(environment.notificationsPollMs || 30000).subscribe(() => this.refreshPending());

    // Al volver a la pestaña, refresca al tiro
    this.visibilityHandler = () => {
      try {
        if (typeof document !== 'undefined' && document && document.hidden === false) {
          this.refreshPending();
        }
      } catch (_) {
        this.refreshPending();
      }
    };
    try {
      if (typeof document !== 'undefined' && document && document.addEventListener) {
        document.addEventListener('visibilitychange', this.visibilityHandler);
      }
    } catch (_) {
      // ignore
    }
  }

  onBellClick(event: any) {
    // Evita el salto al tope por el href="#" pero deja que Bootstrap maneje el toggle del dropdown
    if (event && event.preventDefault) event.preventDefault();
    // Request permission bajo gesto de usuario (mejor compatibilidad con navegadores)
    this.requestBrowserNotificationPermission();
    this.refreshPending();
  }

  refreshNow(event: any) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();
    this.refreshPending();
  }

  setViewMode(mode: 'new' | 'all', event: any) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();
    this.viewMode = mode;
    this.rebuildNotificationsFromCurrentCounts();
  }

  markAllAsRead(event: any) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();

    // Marca como visto lo que está pendiente ahora (persistente)
    this.seenCotizacionesCount = this.currentCotizacionesCount;
    this.seenAprobacionOcCount = this.currentAprobacionOcCount;
    this.seenRechazadasOcCount = this.currentRechazadasOcCount;
    this.saveSeenCountsToStorage();
    this.rebuildNotificationsFromCurrentCounts();
  }

  closeNotificationsDropdown(event: any) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();

    try {
      const toggle = document.getElementById('bell-dropdown-toggle') as any;
      if (toggle && toggle.click) {
        // Si está abierto, un click lo cierra (Bootstrap dropdown)
        toggle.click();
      }
    } catch (_) {
      // ignore
    }
  }

  enableBrowserNotifications(event: any) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();
    this.requestBrowserNotificationPermission();
  }

  getBrowserNotificationPermission(): string {
    try {
      const w: any = window as any;
      if (!w || !w.Notification) return 'unsupported';
      return w.Notification.permission;
    } catch (_) {
      return 'unsupported';
    }
  }

  ngOnDestroy() {
    if (this.pollSub) {
      this.pollSub.unsubscribe();
      this.pollSub = null;
    }

    try {
      if (this.visibilityHandler && typeof document !== 'undefined' && document && document.removeEventListener) {
        document.removeEventListener('visibilitychange', this.visibilityHandler);
      }
    } catch (_) {
      // ignore
    }
    this.visibilityHandler = null;
  }

  openNotification(n: { title: string; body: string; link: string; createdAt: Date }, event: any) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();
    this.acknowledgeNotificationLink(n.link);
    if (n.link) {
      this.route.navigate([n.link]);
    }
  }

  private refreshPending() {
    this.isRefreshing = true;

    // Primero carga perfiles reales desde BD
    if (this.userId && !this.profilesLoaded && !this.profilesLoading) {
      this.profilesLoading = true;
      this.loadProfilesFromDb(this.userId).subscribe(ids => {
        this.profileIds = ids;
        this.profilesLoaded = true;
        this.profilesLoading = false;
        this.isRefreshing = false;
        this.refreshPending();
      }, _ => {
        this.profileIds = [];
        this.profilesLoaded = true;
        this.profilesLoading = false;
        this.notifications = [];
        this.unreadCount = 0;
        this.isRefreshing = false;
        this.lastUpdatedAt = new Date();
      });
      return;
    }

    const isAdministracion = this.profileIds.includes(environment.perfiles.administracion);
    const isJefeAdmin = this.profileIds.includes(environment.perfiles.jefeAdministracion);
    const isGerenteAdmin = this.profileIds.includes(environment.perfiles.gerenteAdmin);
    const isSistema = this.profileIds.includes(environment.perfiles.sistema);
    const isSubgerente = this.profileIds.includes(environment.perfiles.subgerente);

    // Requerimiento: Cotizaciones pendientes solo para JefeAdministracion
    const canSeeCotizacionesPendientes = isJefeAdmin;
    // Requerimiento: OC por aprobar solo para Gerente-Administracion
    const canAprobarOC = isGerenteAdmin;
    // Requerimiento: OC rechazadas debe notificar al creador
    const canSeeOcRechazadas = !!this.userId;

    const cotizaciones$ = canSeeCotizacionesPendientes
      ? this.cotizacionesService.getCotizacionesPendientes().catch(_ => Observable.of([]))
      : Observable.of([]);

    const aprobacionOc$ = canAprobarOC
      ? this.movimientoService.getPorAprobar()
        .map(list => (list || []).filter(m => Number(m.tipo) === environment.tiposOC.ordenCompra))
        .catch(_ => Observable.of([]))
      : Observable.of([]);

    const rechazadasOc$ = canSeeOcRechazadas
      ? this.movimientoService.getRechazadas()
        .map(list => (list || [])
          // Algunos flujos usan idSolicitador; se considera "creador" cualquiera de los dos
          .filter(m => Number(m.idCreador) === Number(this.userId) || Number(m.idSolicitador) === Number(this.userId))
          .filter(m => Number(m.tipo) === environment.tiposOC.ordenCompra))
        .catch(_ => Observable.of([]))
      : Observable.of([]);

    Observable.forkJoin([cotizaciones$, aprobacionOc$, rechazadasOc$]).subscribe((results: any[]) => {
      const cotizaciones = (results && results[0]) ? results[0] : [];
      const ocPorAprobar = (results && results[1]) ? results[1] : [];
      const ocRechazadas = (results && results[2]) ? results[2] : [];

      const countCotizaciones = Array.isArray(cotizaciones) ? cotizaciones.length : 0;
      const countOC = Array.isArray(ocPorAprobar) ? ocPorAprobar.length : 0;
      const countOcRechazadas = Array.isArray(ocRechazadas) ? ocRechazadas.length : 0;

      this.currentCotizacionesCount = countCotizaciones;
      this.currentAprobacionOcCount = countOC;
      this.currentRechazadasOcCount = countOcRechazadas;

      this.applySnapshotFromCounts(countCotizaciones, countOC, countOcRechazadas);

      this.maybeShowBrowserToasts(countCotizaciones, countOC, countOcRechazadas);

      this.isRefreshing = false;
      this.lastUpdatedAt = new Date();
    }, _ => {
      // Si falla, no rompemos la UI
      this.isRefreshing = false;
      this.lastUpdatedAt = new Date();
    });
  }

  private requestBrowserNotificationPermission() {
    try {
      const w: any = window as any;
      if (!w || !w.Notification) return;
      if (w.Notification.permission === 'granted') return;
      if (w.Notification.permission === 'denied') return;
      w.Notification.requestPermission();
    } catch (_) {
      // ignore
    }
  }

  private maybeShowBrowserToasts(countCotizaciones: number, countOC: number, countOcRechazadas: number) {
    // No spamear en el primer load
    if (!this.initializedCounts) {
      this.initializedCounts = true;
      this.lastCotizacionesCount = countCotizaciones;
      this.lastAprobacionOcCount = countOC;
      this.lastRechazadasOcCount = countOcRechazadas;
      return;
    }

    const increasedCot = countCotizaciones > this.lastCotizacionesCount;
    const increasedOC = countOC > this.lastAprobacionOcCount;
    const increasedRech = countOcRechazadas > this.lastRechazadasOcCount;

    this.lastCotizacionesCount = countCotizaciones;
    this.lastAprobacionOcCount = countOC;
    this.lastRechazadasOcCount = countOcRechazadas;

    if (!increasedCot && !increasedOC && !increasedRech) return;

    // Requiere soporte y permiso
    let permission = 'unsupported';
    try {
      const w: any = window as any;
      permission = (w && w.Notification) ? w.Notification.permission : 'unsupported';
    } catch (_) {
      permission = 'unsupported';
    }
    if (permission !== 'granted') return;

    // Solo cuando la pestaña no está activa (evita ruido)
    try {
      if (typeof document !== 'undefined' && document && document.hidden === false) {
        return;
      }
    } catch (_) {
      // si falla, igual continuamos
    }

    // Throttle simple
    const nowMs = Date.now();
    if (nowMs - this.lastToastAtMs < 10000) return;
    this.lastToastAtMs = nowMs;

    if (increasedCot) {
      this.showBrowserToast(
        'Nueva(s) cotización(es) pendiente(s)',
        `Ahora tienes ${countCotizaciones} cotización(es) pendiente(s).`,
        '/Cotizaciones',
        'cotizaciones-pendientes'
      );
    }

    if (increasedOC) {
      this.showBrowserToast(
        'Nueva(s) OC por aprobar',
        `Ahora tienes ${countOC} Orden(es) de Compra por aprobar.`,
        '/Aprobacion',
        'oc-por-aprobar'
      );
    }

    if (increasedRech) {
      this.showBrowserToast(
        'Orden(es) de compra rechazada(s)',
        `Tienes ${countOcRechazadas} Orden(es) de Compra rechazada(s) para corregir.`,
        '/EditaOC',
        'oc-rechazadas'
      );
    }
  }

  private showBrowserToast(title: string, body: string, link: string, tag: string) {
    try {
      const w: any = window as any;
      if (!w || !w.Notification) return;
      if (w.Notification.permission !== 'granted') return;

      const notif = new w.Notification(title, {
        body: body,
        tag: tag,
        renotify: true
      });

      notif.onclick = () => {
        try {
          if (w && w.focus) w.focus();
        } catch (_) {
          // ignore
        }
        try {
          this.acknowledgeNotificationLink(link);
          this.route.navigate([link]);
        } catch (_) {
          // ignore
        }
        try {
          notif.close();
        } catch (_) {
          // ignore
        }
      };
    } catch (_) {
      // ignore
    }
  }

  private loadProfilesFromDb(userId: number): Observable<number[]> {
    // Mismo endpoint que se usa en LoginComponent.getPerfiles()
    const url = `${environment.url}UsuariosPerfiles/GetUsuariosPerfilesByIdUsuario/IdUsuario=${userId}`;
    return this.http
      .get(url)
      .map((res: Response) => res.json())
      .map((rows: any[]) => {
        if (!Array.isArray(rows)) return [];
        return rows
          .map(r => Number(r.idPerfil))
          .filter(n => !Number.isNaN(n));
      })
      .catch(_ => Observable.of([]));
  }

  private applyPendingSnapshot(next: Array<{ title: string; body: string; link: string; createdAt: Date }>, total: number) {
    // Merge simple: evita duplicados por título
    const byTitle: { [k: string]: { title: string; body: string; link: string; createdAt: Date } } = {};
    next.forEach(n => (byTitle[n.title] = n));
    this.notifications = Object.keys(byTitle).map(k => byTitle[k]);
    this.unreadCount = total;
  }

  private applySnapshotFromCounts(countCotizaciones: number, countOC: number, countOcRechazadas: number) {
    const now = new Date();

    // Si el pendiente baja (alguien resolvió items), ajusta el "visto" hacia abajo
    // para que futuras subidas vuelvan a contarse como nuevas.
    let shouldPersistSeen = false;
    if ((this.seenCotizacionesCount || 0) > (countCotizaciones || 0)) {
      this.seenCotizacionesCount = countCotizaciones || 0;
      shouldPersistSeen = true;
    }
    if ((this.seenAprobacionOcCount || 0) > (countOC || 0)) {
      this.seenAprobacionOcCount = countOC || 0;
      shouldPersistSeen = true;
    }
    if ((this.seenRechazadasOcCount || 0) > (countOcRechazadas || 0)) {
      this.seenRechazadasOcCount = countOcRechazadas || 0;
      shouldPersistSeen = true;
    }
    if (shouldPersistSeen) {
      this.saveSeenCountsToStorage();
    }

    const unseenCot = Math.max(0, (countCotizaciones || 0) - (this.seenCotizacionesCount || 0));
    const unseenOC = Math.max(0, (countOC || 0) - (this.seenAprobacionOcCount || 0));
    const unseenRech = Math.max(0, (countOcRechazadas || 0) - (this.seenRechazadasOcCount || 0));

    const next: Array<{ title: string; body: string; link: string; createdAt: Date }> = [];

    const includeCot = this.viewMode === 'all' ? (countCotizaciones > 0) : (unseenCot > 0);
    const includeOC = this.viewMode === 'all' ? (countOC > 0) : (unseenOC > 0);
    const includeRech = this.viewMode === 'all' ? (countOcRechazadas > 0) : (unseenRech > 0);

    if (includeCot) {
      next.push({
        title: 'Cotizaciones pendientes',
        body: `Tienes ${countCotizaciones} cotización(es) pendiente(s) para gestionar.`,
        link: '/Cotizaciones',
        createdAt: now
      });
    }

    if (includeOC) {
      next.push({
        title: 'Órdenes de compra pendientes',
        body: `Tienes ${countOC} Orden(es) de Compra pendiente(s) de aprobación.`,
        link: '/Aprobacion',
        createdAt: now
      });
    }

    if (includeRech) {
      next.push({
        title: 'Órdenes de compra rechazadas',
        body: `Tienes ${countOcRechazadas} Orden(es) de Compra rechazada(s) para corregir.`,
        link: '/EditaOC',
        createdAt: now
      });
    }

    this.applyPendingSnapshot(next, unseenCot + unseenOC + unseenRech);
  }

  private rebuildNotificationsFromCurrentCounts() {
    this.applySnapshotFromCounts(this.currentCotizacionesCount, this.currentAprobacionOcCount, this.currentRechazadasOcCount);
  }

  private acknowledgeNotificationLink(link: string) {
    if (!link) return;

    if (link === '/Cotizaciones') {
      this.seenCotizacionesCount = this.currentCotizacionesCount;
    }
    if (link === '/Aprobacion') {
      this.seenAprobacionOcCount = this.currentAprobacionOcCount;
    }
    if (link === '/EditaOC') {
      this.seenRechazadasOcCount = this.currentRechazadasOcCount;
    }

    this.saveSeenCountsToStorage();
    this.rebuildNotificationsFromCurrentCounts();
  }

  private loadSeenCountsFromStorage() {
    try {
      const raw = localStorage.getItem(this.getSeenStorageKey());
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const cot = Number(parsed && parsed.cotizaciones);
      const oc = Number(parsed && parsed.aprobacionOc);
      const rech = Number(parsed && parsed.rechazadasOc);
      this.seenCotizacionesCount = Number.isFinite(cot) ? cot : 0;
      this.seenAprobacionOcCount = Number.isFinite(oc) ? oc : 0;
      this.seenRechazadasOcCount = Number.isFinite(rech) ? rech : 0;
    } catch (_) {
      this.seenCotizacionesCount = 0;
      this.seenAprobacionOcCount = 0;
      this.seenRechazadasOcCount = 0;
    }
  }

  private saveSeenCountsToStorage() {
    try {
      const payload = {
        cotizaciones: this.seenCotizacionesCount || 0,
        aprobacionOc: this.seenAprobacionOcCount || 0,
        rechazadasOc: this.seenRechazadasOcCount || 0
      };
      localStorage.setItem(this.getSeenStorageKey(), JSON.stringify(payload));
    } catch (_) {
      // ignore
    }
  }

  private getSeenStorageKey(): string {
    // Evita que el "visto" se mezcle entre usuarios en el mismo navegador
    return `${this.seenStorageKeyBase}.${Number(this.userId || 0)}`;
  }

  CerrarSesion(){
    localStorage.removeItem("usuario");
    this.route.navigate(['/Login']);
  }

}
