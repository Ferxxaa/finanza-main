import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CuentasComponent } from "./components/cuentas/cuentas.component";

const routes: Routes = [
  {
    path: "",
    component: CuentasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cuentasRoutingModule {}
