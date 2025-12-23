import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-evaluacion',
  templateUrl: './star-evaluacion.component.html',
  styleUrls: ['./star-evaluacion.component.css']
})
export class StarEvaluacionComponent implements OnInit {

  @Input() Eval;

  estrellas:number[]

  constructor() {
    this.estrellas=[];
  }

  ngOnInit() {
    let restado:number = this.Eval;
    // console.log(this.Eval);
    
    for (let i = 0; i < 3; i++) {
      if (restado >= 1){
        restado--
        this.estrellas.push(1)
      }
      else if( restado < 1 && restado > 0){
        restado --
        this.estrellas.push(0.5)
      } else{
        this.estrellas.push(0)
      }
    }
  }

}
