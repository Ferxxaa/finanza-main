import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FijarFlujoService } from '../../../services/Nest/fijar-flujo.service';

@Component({
  selector: 'app-fijar-flujo',
  templateUrl: './fijar-flujo.component.html',
  styleUrls: ['./fijar-flujo.component.css']
})
export class FijarFlujoComponent implements OnInit {

  @Output() close = new EventEmitter();

  constructor(
    public fijarFlujoService: FijarFlujoService
  ) { }

  ngOnInit() {
  }

  prevProg(e) {
    e.stopPropagation()
  }

  closeEvent() {
    this.fijarFlujoService.close();
  }

  asignar() {
    this.fijarFlujoService.fijarFlujo();
    this.closeEvent();
  }

}
