import { Component, OnInit } from '../../../../node_modules/@angular/core';

@Component({
  selector: 'app-home-adn',
  templateUrl: './home-adn.component.html',
  styleUrls: ['./home-adn.component.css']
})
export class HomeAdnComponent implements OnInit {

  Titulo:string;

  constructor() { 
    this.Titulo="";
  }

  ngOnInit() {
  }

}
