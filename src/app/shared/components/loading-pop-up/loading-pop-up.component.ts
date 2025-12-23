import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-pop-up',
  templateUrl: './loading-pop-up.component.html',
  styleUrls: ['./loading-pop-up.component.css']
})
export class LoadingPopUpComponent implements OnInit {

  color:string;
  mode:string
  value:number;
  bufferValue:number;

  constructor() { }

  ngOnInit() {
    this.color = 'primary';
    this.mode = 'indeterminate';
    this.value = 50;
    this.bufferValue = 75;
  }

}
