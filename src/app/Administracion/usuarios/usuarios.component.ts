import { Component, OnInit } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

declare var $: any;

const md5 = new Md5();

//Model
import { mUsuario } from '../../models/mUsuario';
import { mPersona } from '../../models/mPersona';
import { mEstadoCivil } from '../../models/mEstadoCivil';

//Servicios
import { sUsuario } from '../../services/sUsuario.service';
import { sPersona } from '../../services/sPersona.service';
import { sEstadoCivil } from '../../services/sEstadoCivil.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [
    sUsuario,
    sPersona,
    sEstadoCivil
  ]
})
export class UsuariosComponent implements OnInit {



  //Objetos
  Usuario: mUsuario;
  Persona: mPersona;
  usuario: any;

  //Select
  EstadosCiviles: Array<mEstadoCivil>;

  constructor(
    private _sUsuario: sUsuario,
    private _sPersona: sPersona,
    private _sEstadoCivil: sEstadoCivil
  ) {
    this.usuario = JSON.parse(localStorage.usuario);
    this.Usuario = new mUsuario(null, null, '', '', '', true, '', this.usuario.idUsuario, null);
    this.Persona = new mPersona(null, '', '', '', '', '', '', 0, true, '', true, '', this.usuario.idUsuario, null);
    this._sEstadoCivil.getEstadoCivil().subscribe(result => {
      //console.log(result);
      this.EstadosCiviles = result;
    });
  }

  ngOnInit() {
    $(".date").datetimepicker(
      {
        format: 'DD/MM/YYYY'
      }
    );
  }

  asignaFechaNacimiento() {
    let dia = $("#txtTermino").val().split("/")[0];
    let mes = $("#txtTermino").val().split("/")[1];
    let agno = $("#txtTermino").val().split("/")[2];
    this.Persona.fechaNacimiento = agno + "-" + mes + "-" + dia + "T00:00:00";;
  }

  Encriptar() {
    this.Usuario.contraseniaUsuario = md5.appendStr(this.Usuario.contraseniaUsuario).end().toString();
  }

  Agregar(CForm: Form) {
    this._sPersona.postAddPersona(this.Persona).success(result => {

      //console.log(result);

      this.Usuario.idPersona = result.idPersona;
      this.Encriptar()
      this._sUsuario.postAddUsuario(this.Usuario).success(result => {
        this.Usuario = new mUsuario(null, null, '', '', '', true, '', this.usuario.idUsuario, null);
        this.Persona = new mPersona(null, '', '', '', '', '', '', 0, true, '', true, '', this.usuario.idUsuario, null);
        $("#txtNacimiento").val("");
      });
    });
  }

}
