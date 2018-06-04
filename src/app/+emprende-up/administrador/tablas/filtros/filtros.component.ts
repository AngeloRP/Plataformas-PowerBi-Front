import { Component, OnInit} from '@angular/core';
import { FiltrosService } from './filtros.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

  constructor(
    public filtroSvr: FiltrosService
  ) {
  }

  ngOnInit() {
  }

}
