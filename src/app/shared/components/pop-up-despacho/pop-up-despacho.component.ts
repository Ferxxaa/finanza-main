import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up-despacho',
  templateUrl: './pop-up-despacho.component.html',
  styleUrls: ['./pop-up-despacho.component.css']
})
export class PopUpDespachoComponent implements OnInit {

  @Input() despacho;

  constructor() { }

  ngOnInit() {
  }

}
