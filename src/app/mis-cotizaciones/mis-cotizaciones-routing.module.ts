import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MisCotizacionesComponent } from "./components/mis-cotizaciones/mis-cotizaciones.component";

const routes: Routes = [
  {
    path: "",
    component: MisCotizacionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cuentasRoutingModule {}
