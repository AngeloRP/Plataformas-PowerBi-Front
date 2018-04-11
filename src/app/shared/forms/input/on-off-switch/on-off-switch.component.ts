import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-on-off-switch',
  templateUrl: './on-off-switch.component.html',
})
export class OnOffSwitchComponent implements OnInit {

  @Input() title: string;
  @Input() opcion1 = 'ON';
  @Input() opcion2 = 'OFF';
  @Input() model: boolean;
  @Output() modelChange: EventEmitter<boolean>;

  @Input() value: any;

  public widgetId;

  constructor() {
    this.modelChange = new EventEmitter<boolean>();
  }


  ngOnInit() {

    if (this.model === true) {
      this.value = 1;
    } else {
      this.value = 2;
    }
    this.widgetId = 'app-on-off-switch' + OnOffSwitchComponent.widgetsCounter++;
  }

  onChange() {
    console.log('Nuevo Value:' + this.value);
    if (this.value === '1') {
      this.modelChange.emit(true);
    } else {
      this.modelChange.emit(false);
    }

  }


  static widgetsCounter = 0
}
