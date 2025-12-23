import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { reportEvalProvService } from '../../../../services/Nest/reportEvalProv.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
  providers: [
    reportEvalProvService
  ]
})
export class FiltroComponent implements OnInit {

  agno: number;

  years$: Observable<number[]>;
  @Output() emitAgno = new EventEmitter();

  constructor(
    private reportEvalProvService: reportEvalProvService
  ) {
    this.years$ = this.reportEvalProvService.getYears();
    this.agno = new Date().getFullYear();
  }

  ngOnInit() {
    this.emitAgno.emit(new Date().getFullYear());
  }

  emitagno() {
    this.emitAgno.emit(this.agno)
  }

}
