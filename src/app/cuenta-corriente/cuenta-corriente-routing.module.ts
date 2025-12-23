import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CuentaCorrienteComponent } from "./components/cuenta-corriente/cuenta-corriente.component";

const routes: Routes = [
  {
    path: "",
    component: CuentaCorrienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cuentasRoutingModule {}
