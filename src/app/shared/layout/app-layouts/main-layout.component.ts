import { Component, OnInit } from '@angular/core';
import { FadeZoomInTop } from '../../animations/fade-zoom-in-top.decorator';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;

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
    // const body = $('body');
    // body.addClass('hidden-menu');
    // body.addClass('hidden-menu-mobile-lock');
  }

}
