import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IngresoEgresoComponent } from "./components/ingreso-egreso/ingreso-egreso.component";

const routes: Routes = [
  {
    path: "",
    component: IngresoEgresoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cuentasRoutingModule {}
