import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isHomeRoute: boolean = false;

  //Perfiles
  Sistema: boolean;

  //Proyectos
  DirectorProy: boolean;
  CoordinadorProy: boolean;
  SubGerenteProy: boolean;
  Seguridad: boolean;

  //Licitaciones
  DirectorLic: boolean;
  CoordinadorLic: boolean;

  //Finanzas
  Administracion: boolean;
  JefeAdministracion: boolean;
  GerenteAdmin: boolean;

  usuario: any = {};
  perfiles: any = [];

  urlBase: string = 'http://trazas-nbi.com:1234/api/'
  controlador: string = 'UsuariosPerfiles/'
  urlFull: string = this.urlBase + this.controlador

  constructor(private _http: Http, private router: Router) {
    this.Sistema = false;
    this.DirectorProy = false;
    this.CoordinadorProy = false;
    this.SubGerenteProy = false;
    this.Seguridad = false;
    this.DirectorLic = false;
    this.CoordinadorLic = false;
    this.Administracion = false;
    this.GerenteAdmin = false;
   }

  ngOnInit() {

    this.updateIsHomeRoute(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateIsHomeRoute(event.urlAfterRedirects || event.url);
      }
    });

    if (!localStorage.hasOwnProperty('usuario')) {
      console.log("usuario no logueado");
    } else {
      try {
        this.usuario = JSON.parse(localStorage.usuario);
        this._http.get(this.urlFull + 'GetUsuariosPerfilesByIdUsuario/IdUsuario=' + this.usuario.idUsuario)
          .map((res: Response) => res.json())
          .subscribe(data => {
            // console.log(this.usuario);
            // console.log(data);
            data.forEach(element => {
              if (element.idPerfil == 1) this.SubGerenteProy = true;
              if (element.idPerfil == 2) this.DirectorProy = true;
              if (element.idPerfil == 3) this.CoordinadorProy = true;
              if (element.idPerfil == 4) this.Sistema = true;
              if (element.idPerfil == 7) this.DirectorLic = true;
              if (element.idPerfil == 8) this.CoordinadorLic = true;
              if (element.idPerfil == 9) this.Seguridad = true;
              if (element.idPerfil == 10) this.Administracion = true;
              if (element.idPerfil == 11) this.GerenteAdmin = true;
              if (element.idPerfil == 12) this.JefeAdministracion = true;
            });
          });
      }
      catch (err) {
        console.log(err.message);
      }
    }
  }

  getGerente(){
    return this.SubGerenteProy;
  }

  private updateIsHomeRoute(url: string) {
    const normalized = (url || '').split('?')[0].split('#')[0];
    this.isHomeRoute = normalized === '/Home' || normalized.startsWith('/Home/');
  }

}
