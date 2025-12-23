import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

//Rutas
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { UsuariosComponent } from "./Administracion/usuarios/usuarios.component";
import { LayoutComponent } from "./layout/layout.component";
import { ProveedorComponent } from "./proveedor/components/proveedor/proveedor.component";
import { CuentasComponent } from "./cuentas/components/cuentas/cuentas.component";
import { GastosComponent } from "./gastos/components/gastos/gastos.component";
import { CentroCostoComponent } from "./centro-costo/components/centroCosto/centro-costo.component";
import { CotizacionComponent } from "./cotizacion/components/cotizacion/cotizacion.component";
import { MisCotizacionesComponent } from "./mis-cotizaciones/components/mis-cotizaciones/mis-cotizaciones.component";
import { OrdenCompraComponent } from "./orden-compra/components/orden-compra/orden-compra.component";
import { aprobacion } from "./aprobacion/components/aprobacion/cuenta-corriente.component";
import { EditaOcComponent } from "./editar-oc/components/edita-oc/edita-oc.component";
import { ViewOrdenCompraComponent } from "./lista-ordenes/components/view-orden-compra/view-orden-compra.component";
import { CuentaCorrienteComponent } from "./cuenta-corriente/components/cuenta-corriente/cuenta-corriente.component";
import { ViewCentroCostoComponent } from "./lista-centro-costo/components/view-centro-costo/view-centro-costo.component";
import { IngresoEgresoComponent } from "./ingreso-egreso/components/ingreso-egreso/ingreso-egreso.component";
import { MontoInicialComponent } from "./monto/components/monto-inicial/monto-inicial.component";
import { OrdenPedidoComponent } from "./orden-pedido/components/orden-pedido/orden-pedido.component";
import { CajaChicaComponent } from "./cajaChica/components/caja-chica/caja-chica.component";
import { ContenedorReporteComponent } from './reportes/proveedor/contenedor/contenedor-reporte/contenedor-reporte.component'
import { GraficoProveedorComponent } from "./graficos/contenedor/grafico-proveedor/grafico-proveedor.component";
import { GraficoOperacionalComponent } from "./graficos/contenedor/grafico-operacional/grafico-operacional.component";
import { ContenedorFacturasEmitidasComponent } from "./reportes/proveedor/contenedor/contenedor-facturas-emitidas/contenedor-facturas-emitidas.component";
import { ContenedorVentasAreaNegocioComponent } from "./reportes/proveedor/contenedor/contenedor-ventas-area-negocio/contenedor-ventas-area-negocio.component";
import { ContenedorCierreComponent } from './Cierre/contenedor/contenedor-cierre/contenedor-cierre.component';
import { RentabilidadAreaNegocioComponent } from "./graficos/contenedor/rentabilidad-area-negocio/rentabilidad-area-negocio.component";
import { ContenedorConsolidaRentabilidadComponent } from "./reportes/proveedor/contenedor/contenedor-consolida-rentabilidad/contenedor-consolida-rentabilidad.component";
import { ContentConsolidadoCentroCostoComponent } from "./reportes/centroCosto/contenedor/content-consolidado-centro-costo/content-consolidado-centro-costo.component";
import { MisCotizacionesTemplateComponent } from "./MisCotizaciones/mis-cotizaciones-template/mis-cotizaciones-template.component";
import { MisOrdenesCompraComponent } from "./mis-ordenes-compra/mis-ordenes-compra.component";
import { AddOrdenCompraComponent } from "./orden-compra/components/add-orden-compra/add-orden-compra.component";
import { AddOrdenPedidoComponent } from "./orden-pedido/components/add-orden-pedido/add-orden-pedido.component";
import { EditOrdenCompraComponent } from "./orden-compra/components/edit-orden-compra/edit-orden-compra.component";
import { NewIngresoEgresoComponent } from "./ingreso-egreso/components/new-ingreso-egreso/new-ingreso-egreso.component";

declare var require: any;

const routes: Routes = [
  {
    path: "Login",
    component: LoginComponent,
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/Home",
        pathMatch: "full",
      },
      {
        path: "Home",
        component: HomeComponent,
      },
      {
        path: "Usuarios",
        component: UsuariosComponent,
      },
      {
        path: "Proveedor",
        component: ProveedorComponent,
      },
      {
        path: "Cuentas",
        component: CuentasComponent
      },
      {
        path: "Gastos",
        component: GastosComponent
      },
      {
        path: "CentroCosto",
        component: CentroCostoComponent
      },
      {
        path: "Cotizacion",
        component: CotizacionComponent
      },
      {
        path: "Cotizaciones",
        component: MisCotizacionesComponent
      },
      {
        path: "MisCotizaciones",
        component: MisCotizacionesTemplateComponent
      },
      // {
      //   path: "OrdenCompra",
      //   component: OrdenCompraComponent
      // },
      {
        path: "OrdenCompra",
        component: AddOrdenCompraComponent
      },
      {
        path: "MisOrdenCompra",
        component: MisOrdenesCompraComponent
      },
      {
        path: "Aprobacion",
        component: aprobacion
      },
      {
        path: "EditaOC",
        component: EditaOcComponent
      },
      {
        path: "Ordenes",
        component: ViewOrdenCompraComponent
      },
      {
        path: "Cuenta",
        component: CuentaCorrienteComponent
      },
      {
        path: "ViewCentroCosto",
        component: ViewCentroCostoComponent
      },
      {
        path: "IngresoEgreso",
        component: NewIngresoEgresoComponent
      },
      {
        path: "Monto",
        component: MontoInicialComponent
      },
      {
        path: "OrdenPedido/:id",
        component: AddOrdenPedidoComponent
      },
      {
        path: "OrdenCompra/:id",
        component: EditOrdenCompraComponent
      },
      {
        path: "CajaChica",
        component: CajaChicaComponent
      },
      {
        path: "Cierre",
        component: ContenedorCierreComponent
      },
      {
        path: "ReporteProveedor",
        component: ContenedorReporteComponent
      },
      {
        path: "GraficoProveedor",
        component: GraficoProveedorComponent
      },
      {
        path: "GraficoOperacional",
        component: GraficoOperacionalComponent
      },
      {
        path: "FacturasEmitidas",
        component: ContenedorFacturasEmitidasComponent
      },
      {
        path: "VentasporAreaNegocio",
        component: ContenedorVentasAreaNegocioComponent
      },
      {
        path: "RentabilidadAreaNegocio",
        component: RentabilidadAreaNegocioComponent
      },
      {
        path: "Consolidado",
        component: ContenedorConsolidaRentabilidadComponent
      },
      {
        path: "ConsolidadoCentroCosto",
        component: ContentConsolidadoCentroCostoComponent
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
