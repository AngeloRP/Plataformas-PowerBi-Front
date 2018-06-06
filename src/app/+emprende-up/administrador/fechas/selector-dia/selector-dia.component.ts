import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-dia',
  templateUrl: './selector-dia.component.html',
  styleUrls: ['./selector-dia.component.css']
})
export class SelectorDiaComponent implements OnInit {
  fecha: any;
  validationOptions: any = {};
  constructor() { }

  ngOnInit() {
  }

  submitForm(event) {

  }

}
