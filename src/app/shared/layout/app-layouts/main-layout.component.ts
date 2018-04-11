import { Component, OnInit } from '@angular/core';
import { FadeZoomInTop } from "../../animations/fade-zoom-in-top.decorator";
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

@FadeZoomInTop()
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styles: [
     `.layout {
      }`
    ]
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
