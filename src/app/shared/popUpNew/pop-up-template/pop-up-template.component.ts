import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FijarFlujoService } from '../../../services/Nest/fijar-flujo.service';

@Component({
  selector: 'app-pop-up-template',
  templateUrl: './pop-up-template.component.html',
  styleUrls: ['./pop-up-template.component.css'],
  providers: [FijarFlujoService]
})
export class PopUpTemplateComponent implements OnInit {

  @Output() close = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  prevProg(e) {
    e.stopPropagation()
  }

  closeEvent() {
    this.close.emit();
  }

}
