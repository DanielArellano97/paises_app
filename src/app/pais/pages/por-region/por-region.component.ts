import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [ `
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent  {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regionActiva: string = '';
  paises: Country[] = [];
  hayError: boolean = false;

  constructor(private serviceCountry: PaisService) { }

  activarRegion(region: string){

    if(region === this.regionActiva) return;
    this.regionActiva = region;
    this.paises = [];

    this.serviceCountry.getPaisPorRegion(region)
    .subscribe( (paises) => {
      if(paises.length === undefined){
        this.hayError = true;
        this.paises = [];
      }
      this.paises = paises;
    });
  }

  getClaseCSS(region:string){
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary' 
  }
}
