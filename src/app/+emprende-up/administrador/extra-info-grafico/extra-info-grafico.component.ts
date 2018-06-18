import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-extra-info-grafico',
  templateUrl: './extra-info-grafico.component.html',
  styleUrls: ['./extra-info-grafico.component.css']
})
export class ExtraInfoGraficoComponent implements OnInit {
  @Input() data: { titulo: string, fecha: any };
  loading = true;
  constructor() { }

  ngOnInit() {
    this.loading = false
  }

}
