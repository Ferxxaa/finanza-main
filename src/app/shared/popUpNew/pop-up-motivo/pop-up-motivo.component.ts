import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up-motivo',
  templateUrl: './pop-up-motivo.component.html',
  styleUrls: ['./pop-up-motivo.component.css']
})
export class PopUpMotivoComponent implements OnInit {

  @Input() motivo: string;
  @Input() rechazarMotivo: boolean;

  constructor() { }

  ngOnInit() {
  }

}
