import { AfterViewInit, Component, OnInit } from '../../../../node_modules/@angular/core';

@Component({
  selector: 'app-home-adn',
  templateUrl: './home-adn.component.html',
  styleUrls: ['./home-adn.component.css']
})
export class HomeAdnComponent implements OnInit, AfterViewInit {

  Titulo:string;

  constructor() { 
    this.Titulo="";
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Compatibilidad SVG2: algunos navegadores prefieren `href` en vez de `xlink:href`.
    // Copiamos el valor sin duplicar el Base64 en el HTML.
    const images = Array.from(document.querySelectorAll('svg image')) as SVGImageElement[];
    for (const img of images) {
      const xlink = img.getAttribute('xlink:href');
      if (xlink && !img.getAttribute('href')) {
        img.setAttribute('href', xlink);
      }
    }
  }

}
