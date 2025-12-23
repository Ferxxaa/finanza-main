import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from './../material/material.module';
import { RouterModule } from "@angular/router";

// import { SharedModule } from "./../shared/shared.module";

// import { cuentasRoutingModule } from "./aprobacion-routing.module";
// import { aprobacion } from './components/aprobacion/cuenta-corriente.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule
    // SharedModule,
    // cuentasRoutingModule
  ],
  declarations: [
    // aprobacion
  ]
})
export class AprobacionModule { }
