import {Component} from '@angular/core';

import {LayoutService} from '../layout.service';

declare var $:any;

@Component({
  selector: 'sa-minify-menu',
  template: `<span class="hideSideBar {{estadoButton}} " (click)="toggle()">
    
</span>`,
styles:[
  `
  .hideSideBar{
    width: 30%;
    float: right;
    min-height: 49px;
    min-width: 50px;
    cursor: col-resize;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }

  .minificar{
    background-image: url(assets/img/emprende-up/hideSideBar.png);

  }

  .agrandar{
    background-image: url(assets/img/emprende-up/hideSideBar.png);
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      transform: rotate(180deg)
  }
  `
]
})
export class MinifyMenuComponent {
  estadoButton:string = 'minificar';
  constructor(private layoutService: LayoutService) {
  }

  toggle() {
    this.layoutService.onMinifyMenu();
    if(window.localStorage.getItem('menuMinified') == "-1" ){
     this.estadoButton = 'minificar';
    }else{
      this.estadoButton = 'agrandar';
    }
    
  }
}
