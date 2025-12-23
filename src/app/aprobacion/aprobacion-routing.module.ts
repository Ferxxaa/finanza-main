import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { aprobacion } from "./components/aprobacion/cuenta-corriente.component";

const routes: Routes = [
  {
    path: "",
    component: aprobacion,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cuentasRoutingModule {}
