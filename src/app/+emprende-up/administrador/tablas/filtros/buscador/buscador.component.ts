import { Component, OnInit  } from '@angular/core';
import { FiltrosService } from '../filtros.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  constructor(
    public filtroSvr: FiltrosService
  ) {
  }

  ngOnInit() {
    this.filtroSvr.llenarClaseBuscador();
  }

}
