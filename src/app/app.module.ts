import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { Md5 } from "ts-md5/dist/md5";

import { AppComponent } from "./app.component";
import { NgxPaginationModule } from "ngx-pagination";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

//Material
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module'

//Directivas
import { SelectValidatorDirective } from "./shared/directive/select-validator.directive";

//Pipe
import { ComatopointPipe } from "./shared/pipe/comatopoint/comatopoint.pipe";
import { SubCentroCostoPipe } from './shared/pipe/subCentroCosto/sub-centro-costo.pipe';
import { FiltrarSubTipoGastoPipe } from './shared/pipe/filtrarSubTipoGasto/filtrar-sub-tipo-gasto.pipe';
import { SubTipoGastoPipe } from './shared/pipe/subTipoGasto/sub-tipo-gasto.pipe';
import { MesEspPipe } from './shared/pipe/mesEsp/mes-esp.pipe';
import { CalcSaldoPipe } from './cajaChica/pipe/calc-saldo.pipe';
import { OrdenaProveedorPipe } from "./shared/pipe/ordenaProveedor/ordena-proveedor.pipe";
import { FiltraCentroCostoActivoPipe } from './shared/pipe/filtraCentroCostoActivo/filtra-centro-costo-activo.pipe';
import { AddViewPipe } from './shared/pipe/addView/add-view.pipe';

//Modulos
// import { SharedModule } from "./shared/shared.module";
// import {AprobacionModule} from './aprobacion/aprobacion.module';

//Shared components
import { ContentPagesComponent } from './shared/components/content-pages/content-pages.component';

//Componentes
import { UsuariosComponent } from "./Administracion/usuarios/usuarios.component";
import { aprobacion } from "./aprobacion/components/aprobacion/cuenta-corriente.component";
import { CentroCostoComponent } from "./centro-costo/components/centroCosto/centro-costo.component";
import { ConfigBolsasComponent } from "./centro-costo/components/config-bolsas/config-bolsas.component";
import { ConfigIngresosComponent } from "./centro-costo/components/config-ingresos/config-ingresos.component";
import { EditCentroCostoComponent } from "./centro-costo/components/edit-centro-costo/edit-centro-costo.component";
import { CotizacionComponent } from "./cotizacion/components/cotizacion/cotizacion.component";
import { CuentaCorrienteComponent } from "./cuenta-corriente/components/cuenta-corriente/cuenta-corriente.component";
import { DetalleCentroCostoComponent } from "./cuenta-corriente/components/detalle-centro-costo/detalle-centro-costo.component";
import { ViewBolsasComponent } from "./cuenta-corriente/components/view-bolsas/view-bolsas.component";
import { CuentasComponent } from "./cuentas/components/cuentas/cuentas.component";
import { EditaOcComponent } from "./editar-oc/components/edita-oc/edita-oc.component";
import { EvaluacionProveedoresComponent } from "./Evaluacion/evaluacion-proveedores/evaluacion-proveedores.component";
import { GastosComponent } from "./gastos/components/gastos/gastos.component";
import { HomeComponent } from "./home/home.component";
import { HomeAdnComponent } from "./home/home-adn/home-adn.component";
import { IngresoEgresoComponent } from "./ingreso-egreso/components/ingreso-egreso/ingreso-egreso.component";
import { LayoutComponent } from "./layout/layout.component";
import { DetalleComponent } from "./lista-centro-costo/components/detalle/detalle.component";
import { ListaTipoGastoComponent } from "./lista-centro-costo/components/lista-tipo-gasto/lista-tipo-gasto.component";
import { PopUpOcComponent } from "./lista-centro-costo/components/pop-up-oc/pop-up-oc.component";
import { TablaCentroCostoComponent } from "./lista-centro-costo/components/tabla-centro-costo/tabla-centro-costo.component";
import { ViewCentroCostoComponent } from "./lista-centro-costo/components/view-centro-costo/view-centro-costo.component";
import { EvaluacionComponent } from "./lista-ordenes/components/evaluacion/evaluacion.component";
import { ViewOrdenCompraComponent } from "./lista-ordenes/components/view-orden-compra/view-orden-compra.component";
import { LoginComponent } from "./login/login.component";
import { MisCotizacionesComponent } from "./mis-cotizaciones/components/mis-cotizaciones/mis-cotizaciones.component";
import { MontoInicialComponent } from "./monto/components/monto-inicial/monto-inicial.component";
import { OrdenCompraComponent } from "./orden-compra/components/orden-compra/orden-compra.component";
import { ValoresMonedasComponent } from './orden-compra/components/valores-monedas/valores-monedas.component';
import { OrdenPedidoComponent } from "./orden-pedido/components/orden-pedido/orden-pedido.component";
import { ErrorComponent } from "./PopUp/error/error.component";
import { ProveedorComponent } from "./proveedor/components/proveedor/proveedor.component";
import { BuscadorComponent } from "./shared/components/buscador/buscador.component";
import { CorrectoComponent } from "./shared/components/correcto/correcto.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { HederTrazasComponent } from "./shared/components/heder-trazas/heder-trazas.component";
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { NavComponent } from "./shared/components/nav/nav.component";
import { PopUpOrdenPedidoComponent } from "./shared/components/orden-pedido/orden-pedido.component";
import { PopUpCondicionComponent } from "./shared/components/pop-up-condicion/pop-up-condicion.component";
import { PopUpDespachoComponent } from "./shared/components/pop-up-despacho/pop-up-despacho.component";
import { PopUpFirmaComponent } from "./shared/components/pop-up-firma/pop-up-firma.component";
import { PopUpItemsComponent } from "./shared/components/pop-up-items/pop-up-items.component";
import { PopUpNotasComponent } from "./shared/components/pop-up-notas/pop-up-notas.component";
import { PopUpProveedorComponent } from "./shared/components/pop-up-proveedor/pop-up-proveedor.component";
import { UserComponent } from "./shared/components/user/user.component";
import { AddContratoComponent } from "./centro-costo/components/add-contrato/add-contrato.component";
import { CardOcComponent } from './aprobacion/components/card-oc/card-oc.component';
import { PopupOcComponent } from './shared/components/popup-oc/popup-oc.component';
import { PopUpTipoGastoComponent } from './shared/components/pop-up-tipo-gasto/pop-up-tipo-gasto.component';
import { PopUpDirectosComponent } from './shared/components/pop-up-directos/pop-up-directos.component';
import { CajaChicaComponent } from './cajaChica/components/caja-chica/caja-chica.component';
import { AddProfesionalComponent } from './cajaChica/components/add-profesional/add-profesional.component';
import { RegistrosIngresosComponent } from './cajaChica/components/registros-ingresos/registros-ingresos.component';
import { ResumenProfesionalComponent } from './cajaChica/components/resumen-profesional/resumen-profesional.component';
import { PopupEvaluacionComponent } from './shared/components/popup-evaluacion/popup-evaluacion.component';
import { StarEvaluacionComponent } from './shared/components/star-evaluacion/star-evaluacion.component';
import { RendicionPopupComponent } from './cajaChica/components/rendicion-popup/rendicion-popup.component';
import { CierreAnualComponent } from './Cierre/components/cierre-anual/cierre-anual.component';
import { PendienteAprobarPipe } from './cajaChica/pipe/pendiente-aprobar.pipe';
import { ContenedorReporteComponent } from './reportes/proveedor/contenedor/contenedor-reporte/contenedor-reporte.component';
import { FiltroComponent } from './reportes/proveedor/component/filtro/filtro.component';
import { CabeceraComponent } from './reportes/proveedor/component/cabecera/cabecera.component';
import { ItemsComponent } from './reportes/proveedor/component/items/items.component';
import { FiltroItemPipe } from './reportes/proveedor/pipes/filtro-item.pipe';
import { ColoresEvaluacionComponent } from './reportes/proveedor/component/colores-evaluacion/colores-evaluacion.component';
import { TotalesItemsComponent } from './reportes/proveedor/component/totales-items/totales-items.component';
import { ResumenAnualComponent } from './reportes/proveedor/component/resumen-anual/resumen-anual.component';
import { ProveedoresEstrategicosComponent } from './reportes/proveedor/component/proveedores-estrategicos/proveedores-estrategicos.component';
import { CortarTextosPipe } from './reportes/proveedor/pipes/cortar-textos.pipe';
import { ProveedoresEstrategicosCostoComponent } from './reportes/proveedor/component/proveedores-estrategicos-costo/proveedores-estrategicos-costo.component';
import { GraficoProveedorComponent } from './graficos/contenedor/grafico-proveedor/grafico-proveedor.component';
import { ResumenComponent } from './graficos/components/resumen/resumen.component';
import { GraficoComponent } from './graficos/components/grafico/grafico.component';
import { GraficoOperacionalComponent } from './graficos/contenedor/grafico-operacional/grafico-operacional.component';
import { TablaOperacionalComponent } from './graficos/components/tabla-operacional/tabla-operacional.component';
import { ContenidoTablaOperacionalComponent } from './graficos/components/contenido-tabla-operacional/contenido-tabla-operacional.component';
import { GraficoTipoGastoComponent } from './graficos/components/grafico-tipo-gasto/grafico-tipo-gasto.component';
import { ContenidoTablaOperacionalSubTipoComponent } from './graficos/components/contenido-tabla-operacional-sub-tipo/contenido-tabla-operacional-sub-tipo.component';
import { ContenedorFacturasEmitidasComponent } from './reportes/proveedor/contenedor/contenedor-facturas-emitidas/contenedor-facturas-emitidas.component';
import { FacturasEmitidasAgnoComponent } from './reportes/proveedor/component/facturas-emitidas-agno/facturas-emitidas-agno.component';
import { DetalleVentaComponent } from './reportes/proveedor/component/detalle-venta/detalle-venta.component';
import { CompraTipoFacturacionComponent } from './graficos/components/compra-tipo-facturacion/compra-tipo-facturacion.component';
import { FacturacionAreaNegocioComponent } from './graficos/components/facturacion-area-negocio/facturacion-area-negocio.component';
import { FacturacionCentroCostoComponent } from './graficos/components/facturacion-centro-costo/facturacion-centro-costo.component';
import { FacturacionMensualComponent } from './graficos/components/facturacion-mensual/facturacion-mensual.component';
import { ContenedorPopUpComponent } from './reportes/proveedor/contenedor/contenedor-pop-up/contenedor-pop-up.component';
import { TablaResumenGraficosComponent } from './reportes/proveedor/component/tabla-resumen-graficos/tabla-resumen-graficos.component';
import { ContenedorVentasAreaNegocioComponent } from './reportes/proveedor/contenedor/contenedor-ventas-area-negocio/contenedor-ventas-area-negocio.component';
import { ItemVentasAreaNegocioComponent } from './reportes/proveedor/component/item-ventas-area-negocio/item-ventas-area-negocio.component';
import { PopUpLoadingComponent } from './shared/contenedor/pop-up-loading/pop-up-loading.component';
import { LoadingPopUpComponent } from './shared/components/loading-pop-up/loading-pop-up.component';
import { ContenedorCierreComponent } from './Cierre/contenedor/contenedor-cierre/contenedor-cierre.component';
import { ListadoCierreComponent } from './Cierre/components/listado-cierre/listado-cierre.component';
import { ContenedorReporteCentroCostoComponent } from './reportes/proveedor/contenedor/contenedor-reporte-centro-costo/contenedor-reporte-centro-costo.component';
import { RentabilidadAreaNegocioComponent } from './graficos/contenedor/rentabilidad-area-negocio/rentabilidad-area-negocio.component';
import { TablaRentabilidadComponent } from './graficos/components/tabla-rentabilidad/tabla-rentabilidad.component';
import { GraphRentabilidadAreaNegocioComponent } from './graficos/components/graph-rentabilidad-area-negocio/graph-rentabilidad-area-negocio.component';
import { ContenedorConsolidaRentabilidadComponent } from './reportes/proveedor/contenedor/contenedor-consolida-rentabilidad/contenedor-consolida-rentabilidad.component';
import { TablaConsolidadoComponent } from './reportes/proveedor/component/tabla-consolidado/tabla-consolidado.component';
import { TablaConsolidadoOperacionalComponent } from './reportes/proveedor/component/tabla-consolidado-operacional/tabla-consolidado-operacional.component';
import { GraficoConsolidadoBarrasComponent } from './reportes/proveedor/component/grafico-consolidado-barras/grafico-consolidado-barras.component';
import { RemoveOperacionalPipe } from './reportes/proveedor/pipes/remove-operacional.pipe';
import { DetalleProveedorComponent } from './reportes/proveedor/component/detalle-proveedor/detalle-proveedor.component';
import { DetalleEvaluacionesComponent } from './reportes/proveedor/component/detalle-evaluaciones/detalle-evaluaciones.component';
import { OrdenesEvaluadasAgnoPipe } from './reportes/proveedor/pipes/ordenes-evaluadas-agno.pipe';
import { ContentConsolidadoCentroCostoComponent } from './reportes/centroCosto/contenedor/content-consolidado-centro-costo/content-consolidado-centro-costo.component';
import { TablaReporteCentroCostoComponent } from './reportes/centroCosto/component/tabla-reporte-centro-costo/tabla-reporte-centro-costo.component';
import { ItemCuentaCorrienteComponent } from './cuenta-corriente/components/item-cuenta-corriente/item-cuenta-corriente.component';
import { DetalleOrdenComponent } from './reportes/centroCosto/component/detalle-orden/detalle-orden.component';
import { GraficoOperacionalAgnosComponent } from './graficos/components/grafico-operacional-agnos/grafico-operacional-agnos.component';
import { SortCajaChicaDescPipe } from './cajaChica/pipe/sort-caja-chica-desc.pipe';
import { SortAgnosPipe } from './Cierre/pipe/sort-agnos.pipe';
import { CalcPorcentajePipe } from './Cierre/pipe/calc-porcentaje.pipe';
import { GraphCierresComponent } from './shared/contenedor/graph-cierres/graph-cierres.component';
import { ListCentroCostoComponent } from './shared/components/list-centro-costo/list-centro-costo.component';
import { GarphCierresComponent } from './shared/components/garph-cierres/garph-cierres.component';
import { PopUpVentasComprasCentroCostoComponent } from './reportes/centroCosto/component/pop-up-ventas-compras-centro-costo/pop-up-ventas-compras-centro-costo.component';
import { MisCotizacionesTemplateComponent } from './MisCotizaciones/mis-cotizaciones-template/mis-cotizaciones-template.component';
import { CardsComponent } from './shared/components/cards/cards.component';
import { FilterMisCotizacionesPipe } from './MisCotizaciones/pipe/filter-mis-cotizaciones.pipe';
import { MiCotizacionComponent } from "./MisCotizaciones/components/cotizacion/cotizacion.component";
import { OrdenarPrioridadCotizacionesPipe } from './MisCotizaciones/pipe/ordenar-prioridad-cotizaciones.pipe';
import { MisOrdenesCompraComponent } from './mis-ordenes-compra/mis-ordenes-compra.component';
import { CardOcelementComponent } from './shared/components/movil/card-ocelement/card-ocelement.component';
import { FilterOcbyUserPipe } from './shared/pipe/filter-ocby-user.pipe';
import { SortOcDescPipe } from './shared/pipe/sortOcDesc/sort-oc-desc.pipe';
import { GarantiasComponent } from './shared/components/garantias/garantias.component';
import { SortProveedorPipe } from './shared/pipe/sortProveedores/sort-proveedor.pipe';
import { GetCuentaCorrienteComponent } from "./cuenta-corriente/components/get-cuenta-corriente/get-cuenta-corriente.component";
import { PopUpTemplateComponent } from './shared/popUpNew/pop-up-template/pop-up-template.component';
import { OcPopUpComponent } from './shared/popUpNew/oc-pop-up/oc-pop-up.component';
import { ProveedorPopUpComponent } from './shared/popUpNew/proveedor-pop-up/proveedor-pop-up.component';
import { TipoGastoPopUpComponent } from './shared/popUpNew/tipo-gasto-pop-up/tipo-gasto-pop-up.component';
import { CentroCostopopUpComponent } from './shared/popUpNew/centro-costopop-up/centro-costopop-up.component';
import { ItemPopUpComponent } from './shared/popUpNew/item-pop-up/item-pop-up.component';
import { CondicionPopUpComponent } from './shared/popUpNew/condicion-pop-up/condicion-pop-up.component';
import { PopUpMotivoComponent } from './shared/popUpNew/pop-up-motivo/pop-up-motivo.component';
import { GetViewCentroCostoComponent } from "./lista-centro-costo/components/get-view-centro-costo/get-view-centro-costo.component";
import { PopUpLoginFixedComponent } from './shared/components/pop-up-login-fixed/pop-up-login-fixed.component';
import { DirectoPopUpComponent } from './shared/popUpNew/directo-pop-up/directo-pop-up.component';
import { DirectoIngresoPopUpComponent } from './shared/popUpNew/directo-ingreso-pop-up/directo-ingreso-pop-up.component';
import { AddOrdenCompraComponent } from "./orden-compra/components/add-orden-compra/add-orden-compra.component";
import { OcItemComponent } from './orden-compra/components/oc-item/oc-item.component';
import { RadEstadoPagoComponent } from './orden-compra/components/rad-estado-pago/rad-estado-pago.component';
import { GetMovimientosComponent } from "./lista-ordenes/components/get-movimientos/get-movimientos.component";
import { FiltraTiposPipe } from './lista-centro-costo/pipe/filtra-tipos.pipe';
import { ViewDetalleCentroCostoComponent } from './lista-centro-costo/components/view-detalle-centro-costo/view-detalle-centro-costo.component';
import { FilterSubTipoGastoByTipoGastoPipe } from './lista-centro-costo/pipe/filter-sub-tipo-gasto-by-tipo-gasto.pipe';
import { AddOrdenPedidoComponent } from "./orden-pedido/components/add-orden-pedido/add-orden-pedido.component";
import { AddTipoGastoComponent } from './gastos/components/add-tipo-gasto/add-tipo-gasto.component';
import { AddSubTipoGastoComponent } from './gastos/components/add-sub-tipo-gasto/add-sub-tipo-gasto.component';
import { ListTiposGastoComponent } from './gastos/components/list-tipos-gasto/list-tipos-gasto.component';
import { FilterSubTipoActivePipe } from "./gastos/pipe/filter-sub-tipo-active.pipe";
import { AddAreaNegocioComponent } from './centro-costo/components/add-area-negocio/add-area-negocio.component';
import { AddCentroCostoComponent } from './centro-costo/components/add-centro-costo/add-centro-costo.component';
import { ListaCentrosCostoComponent } from './centro-costo/components/lista-centros-costo/lista-centros-costo.component';
import { ResponsableNamePipe } from "./lista-ordenes/pipes/responsable-name.pipe";
import { EditOrdenCompraComponent } from './orden-compra/components/edit-orden-compra/edit-orden-compra.component';
import { NewIngresoEgresoComponent } from "./ingreso-egreso/components/new-ingreso-egreso/new-ingreso-egreso.component";
import { OpPopUpComponent } from './shared/popUpNew/op-pop-up/op-pop-up.component';
import { AddMonthPipe } from './reportes/proveedor/pipes/add-month.pipe';
import { SortEpPipe } from './shared/pipe/sortEP/sort-ep.pipe';
import { FilterCentroCostoActivePipe } from './shared/pipe/filterCCActive/filter-centro-costo-active.pipe';
import { FijarFlujoComponent } from './shared/components/fijar-flujo/fijar-flujo.component';
import { FilterBolsasMinorZeroPipe } from './lista-centro-costo/pipe/filter-bolsas-minor-zero.pipe';
import { FolioPipe } from './shared/pipe/folio/folio.pipe';
import { CorrelativoPipe } from './shared/pipe/correlativo/correlativo.pipe';
import { TotalImpuestosPipe } from './lista-centro-costo/pipe/total-impuestos.pipe';
import { EditCentroCostoNestComponent } from './centro-costo/components/edit-centro-costo-nest/edit-centro-costo-nest.component';
import { MatSlideToggleModule } from "@angular/material";
import { ConcatHistoricosPipe } from './reportes/centroCosto/pipe/concat-historicos.pipe';
import { FilterReportAreaNegocioPipe } from './reportes/centroCosto/pipe/filter-report-area-negocio.pipe';
import { FilterOperacionalesPipe } from './graficos/pipe/filter-operacionales.pipe';
import { EvaluacionMasivaComponent } from "./proveedor/components/evaluacion-masiva/evaluacion-masiva.component";


//Componentes

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    aprobacion,
    CentroCostoComponent,
    ConfigBolsasComponent,
    ConfigIngresosComponent,
    EditCentroCostoComponent,
    CotizacionComponent,
    CuentaCorrienteComponent,
    DetalleCentroCostoComponent,
    ViewBolsasComponent,
    CuentasComponent,
    EditaOcComponent,
    EvaluacionProveedoresComponent,
    GastosComponent,
    HomeComponent,
    HomeAdnComponent,
    IngresoEgresoComponent,
    LayoutComponent,
    DetalleComponent,
    ListaTipoGastoComponent,
    PopUpOcComponent,
    TablaCentroCostoComponent,
    ViewCentroCostoComponent,
    EvaluacionComponent,
    ViewOrdenCompraComponent,
    LoginComponent,
    MisCotizacionesComponent,
    MontoInicialComponent,
    OrdenCompraComponent,
    ValoresMonedasComponent,
    OrdenPedidoComponent,
    ErrorComponent,
    ProveedorComponent,
    EvaluacionMasivaComponent,
    BuscadorComponent,
    CorrectoComponent,
    HeaderComponent,
    HederTrazasComponent,
    LoadingComponent,
    NavComponent,
    PopUpOrdenPedidoComponent,
    PopUpCondicionComponent,
    PopUpDespachoComponent,
    PopUpFirmaComponent,
    PopUpItemsComponent,
    PopUpNotasComponent,
    PopUpProveedorComponent,
    SelectValidatorDirective,
    ComatopointPipe,
    UserComponent,
    AddContratoComponent,
    CardOcComponent,
    PopupOcComponent,
    PopUpTipoGastoComponent,
    MesEspPipe,
    FiltrarSubTipoGastoPipe,
    PopUpDirectosComponent,
    CajaChicaComponent,
    AddProfesionalComponent,
    RegistrosIngresosComponent,
    ResumenProfesionalComponent,
    SubCentroCostoPipe,
    PopupEvaluacionComponent,
    StarEvaluacionComponent,
    CalcSaldoPipe,
    RendicionPopupComponent,
    SubTipoGastoPipe,
    CierreAnualComponent,
    OrdenaProveedorPipe,
    PendienteAprobarPipe,
    ContenedorReporteComponent,
    FiltroComponent,
    CabeceraComponent,
    ItemsComponent,
    FiltroItemPipe,
    ColoresEvaluacionComponent,
    TotalesItemsComponent,
    ResumenAnualComponent,
    ProveedoresEstrategicosComponent,
    CortarTextosPipe,
    ProveedoresEstrategicosCostoComponent,
    GraficoProveedorComponent,
    ResumenComponent,
    GraficoComponent,
    GraficoOperacionalComponent,
    TablaOperacionalComponent,
    ContenidoTablaOperacionalComponent,
    GraficoTipoGastoComponent,
    ContenidoTablaOperacionalSubTipoComponent,
    ContenedorFacturasEmitidasComponent,
    FacturasEmitidasAgnoComponent,
    DetalleVentaComponent,
    CompraTipoFacturacionComponent,
    FacturacionAreaNegocioComponent,
    FacturacionCentroCostoComponent,
    FacturacionMensualComponent,
    ContenedorPopUpComponent,
    TablaResumenGraficosComponent,
    ContenedorVentasAreaNegocioComponent,
    ItemVentasAreaNegocioComponent,
    PopUpLoadingComponent,
    LoadingPopUpComponent,
    ContenedorCierreComponent,
    ListadoCierreComponent,
    ContenedorReporteCentroCostoComponent,
    RentabilidadAreaNegocioComponent,
    TablaRentabilidadComponent,
    GraphRentabilidadAreaNegocioComponent,
    ContenedorConsolidaRentabilidadComponent,
    TablaConsolidadoComponent,
    TablaConsolidadoOperacionalComponent,
    GraficoConsolidadoBarrasComponent,
    FiltraCentroCostoActivoPipe,
    RemoveOperacionalPipe,
    DetalleProveedorComponent,
    DetalleEvaluacionesComponent,
    OrdenesEvaluadasAgnoPipe,
    ContentConsolidadoCentroCostoComponent,
    TablaReporteCentroCostoComponent,
    ItemCuentaCorrienteComponent,
    DetalleOrdenComponent,
    AddViewPipe,
    GraficoOperacionalAgnosComponent,
    SortCajaChicaDescPipe,
    SortAgnosPipe,
    CalcPorcentajePipe,
    GraphCierresComponent,
    ListCentroCostoComponent,
    GarphCierresComponent,
    PopUpVentasComprasCentroCostoComponent,
    MisCotizacionesTemplateComponent,
    ContentPagesComponent,
    CardsComponent,
    FilterMisCotizacionesPipe,
    MiCotizacionComponent,
    OrdenarPrioridadCotizacionesPipe,
    MisOrdenesCompraComponent,
    CardOcelementComponent,
    FilterOcbyUserPipe,
    SortOcDescPipe,
    GarantiasComponent,
    SortProveedorPipe,
    GetCuentaCorrienteComponent,
    PopUpTemplateComponent,
    OcPopUpComponent,
    ProveedorPopUpComponent,
    TipoGastoPopUpComponent,
    CentroCostopopUpComponent,
    ItemPopUpComponent,
    CondicionPopUpComponent,
    PopUpMotivoComponent,
    GetViewCentroCostoComponent,
    PopUpLoginFixedComponent,
    DirectoPopUpComponent,
    DirectoIngresoPopUpComponent,
    AddOrdenCompraComponent,
    OcItemComponent,
    RadEstadoPagoComponent,
    GetMovimientosComponent,
    FiltraTiposPipe,
    ViewDetalleCentroCostoComponent,
    FilterSubTipoGastoByTipoGastoPipe,
    AddOrdenPedidoComponent,
    AddTipoGastoComponent,
    AddSubTipoGastoComponent,
    ListTiposGastoComponent,
    FilterSubTipoActivePipe,
    AddAreaNegocioComponent,
    AddCentroCostoComponent,
    ListaCentrosCostoComponent,
    ResponsableNamePipe,
    EditOrdenCompraComponent,
    NewIngresoEgresoComponent,
    OpPopUpComponent,
    AddMonthPipe,
    SortEpPipe,
    FilterCentroCostoActivePipe,
    FijarFlujoComponent,
    FilterBolsasMinorZeroPipe,
    FolioPipe,
    CorrelativoPipe,
    TotalImpuestosPipe,
    EditCentroCostoNestComponent,
    ConcatHistoricosPipe,
    FilterReportAreaNegocioPipe,
    FilterOperacionalesPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    // SharedModule
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    AppRoutingModule,
    MaterialModule,
    MatSlideToggleModule
    // AprobacionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
