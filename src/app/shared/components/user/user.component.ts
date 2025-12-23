import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuario:any={}
  date;


  constructor(private route: Router) {
    if (!localStorage.hasOwnProperty('usuario')) {
      console.log("usuario no logueado");
    }else{
      try {
        this.usuario=JSON.parse(localStorage.usuario);
      }
      catch(err) {
          console.log(err.message);
      }
    }
  }

  ngOnInit() {
  }

  CerrarSesion(){
    localStorage.removeItem("usuario");
    this.route.navigate(['/Login']);
  }

}
