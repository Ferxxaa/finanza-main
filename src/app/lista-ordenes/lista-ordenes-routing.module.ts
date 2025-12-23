import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ViewOrdenCompraComponent } from "./components/view-orden-compra/view-orden-compra.component";

const routes: Routes = [
  {
    path: "",
    component: ViewOrdenCompraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cuentasRoutingModule {}
