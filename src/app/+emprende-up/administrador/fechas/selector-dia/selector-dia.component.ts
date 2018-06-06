import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-dia',
  templateUrl: './selector-dia.component.html',
  styleUrls: ['./selector-dia.component.css']
})
export class SelectorDiaComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  constructor() { }

  ngOnInit() {
  }

  submitForm(event) {

  }

}
