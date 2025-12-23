import { Injectable } from "@angular/core";

declare var $: any;

@Injectable()
export class comunesFechas {
  calendario() {
    setTimeout(() => {
      $(".date").datetimepicker({ format: "DD/MM/YYYY" });
    }, 300);
  }

  cortaFecha(fecha: Date) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 2;
    let agno = fecha.getFullYear();
    if (mes > 12) {
      mes = 1;
      agno += 1;
    }
    return (
      agno +
      "-" +
      mes.toString().padStart(2, "0") +
      "-" +
      dia.toString().padStart(2, "0") +
      "T00:00:00"
    );
  }

  cortaFechaDate(fecha: Date, indice?: number) {

    let dia = fecha.getDate();
    let mes = fecha.getMonth() + (indice == 0 ? 1 : 2);
    let agno = fecha.getFullYear();
    if (mes > 12) {
      mes = 1;
      agno += 1;
    }
    return new Date(
      agno +
      "-" +
      mes.toString().padStart(2, "0") +
      "-" +
      dia.toString().padStart(2, "0") +
      "T00:00:00"
    );
  }

  fechaToString(fecha: Date) {
    let fechaget = new Date(fecha);
    let dia = fechaget.getDate();
    let mes = (fechaget.getMonth() + 2).toString().padStart(2, "0");
    let agno = fechaget.getFullYear();
    return `${dia}/${mes}/${agno}`
  }

  fechaToStringAdd1(fecha: Date) {
    let fechaget = new Date(fecha);
    let dia = fechaget.getUTCDate();
    let mes = (fechaget.getUTCMonth() + 1).toString().padStart(2, "0");
    let agno = fechaget.getUTCFullYear();
    return `${dia}/${mes}/${agno}`
  }

  fechaToStringUTC(fecha: Date) {
    let fechaget = new Date(fecha);
    let dia = fechaget.getUTCDate().toString().padStart(2, "0");
    let mes = (fechaget.getUTCMonth() + 1).toString().padStart(2, "0");
    let agno = fechaget.getUTCFullYear();
    return `${dia}/${mes}/${agno}`
  }

  retFechaFormat(fecha: string) {
    fecha = fecha.split("T")[0];
    return (
      fecha.split("-")[2] +
      "/" +
      fecha.split("-")[1] +
      "/" +
      fecha.split("-")[0]
    );
  }

  retFechaParaGuardar(fecha: string): string {
    if (fecha) {
      let dia = fecha.split("/")[0];
      let mes = fecha.split("/")[1];
      let agno = fecha.split("/")[2];
      return agno + "-" + mes + "-" + dia + "T00:00:00";
    }
    return null;
  }

  retFechaParaGuardarDate(fecha: string): Date {
    if (fecha) {
      let dia = fecha.split("/")[0];
      let mes = fecha.split("/")[1];
      let agno = fecha.split("/")[2];
      return new Date(`${mes}/${dia}/${agno}`)
      // return agno + "-" + mes + "-" + dia + "T00:00:00";
    }
    return null;
  }

  DespliegaFecha(htmlId: string, fechaString: string) {
    if (fechaString)
      setTimeout(() => $(htmlId).val(this.retFechaFormat(fechaString)), 200);
  }

  DespliegaFechaDate(htmlId: string, fecha: Date) {
    if (fecha)
      setTimeout(() => $(htmlId).val(this.fechaToString(fecha)), 300);
  }

  DespliegaFechaDateAdd1(htmlId: string, fecha: Date) {
    if (fecha)
      setTimeout(() => $(htmlId).val(this.fechaToStringAdd1(fecha)), 300);
  }

  DespliegaFechaDateUTC(htmlId: string, fecha: Date) {
    if (fecha && $(htmlId))
      setTimeout(() => $(htmlId).val(this.fechaToStringUTC(fecha)), 300);
  }

  getFechaHtmlElement(element: any): string {
    let dia, mes, agno

    dia = element.val().split("/")[0];
    mes = element.val().split("/")[1];
    agno = element.val().split("/")[2];
    return agno + "-" + mes + "-" + dia + "T00:00:00";
  }

  stringToFecha(fechaString: string): Date {
    let dia, mes, agno
    dia = fechaString.split("/")[0];
    mes = fechaString.split("/")[1];
    agno = fechaString.split("/")[2];
    return new Date(`${mes}/${dia}/${agno}`);
  }
}
