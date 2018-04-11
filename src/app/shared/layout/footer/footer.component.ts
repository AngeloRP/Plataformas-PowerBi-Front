import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  anio: number;
  constructor() {
    const dia = new Date();
    this.anio = dia.getFullYear();
  }

  ngOnInit() {}
}
