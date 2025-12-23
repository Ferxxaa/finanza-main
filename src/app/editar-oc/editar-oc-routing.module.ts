import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditaOcComponent } from "./components/edita-oc/edita-oc.component";

const routes: Routes = [
  {
    path: "",
    component: EditaOcComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cuentasRoutingModule {}
