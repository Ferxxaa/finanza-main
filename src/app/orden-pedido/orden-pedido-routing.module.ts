import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrdenPedidoComponent } from "./components/orden-pedido/orden-pedido.component";

const routes : Routes = [
    {
        path: '',
        component:OrdenPedidoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class proveedorRoutingModule{}