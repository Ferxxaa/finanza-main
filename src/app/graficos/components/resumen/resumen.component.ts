import { Component, Input, OnInit } from '@angular/core';
import { EvalProveedoresYear } from '../../../models/nestReportEvalProv';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  @Input() data: EvalProveedoresYear[];

  constructor() { }

  ngOnInit() {
  }

}
