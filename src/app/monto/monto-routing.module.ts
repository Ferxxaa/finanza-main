import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MontoInicialComponent } from "./components/monto-inicial/monto-inicial.component";

const routes: Routes = [
  {
    path: "",
    component: MontoInicialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cuentasRoutingModule {}
