import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  public title = 'app works!';
  currentUrl: string = '/';
  public constructor(
    public router: Router,
    private viewContainerRef: ViewContainerRef) {

    /*router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
       // console.log('URL ACTUAL:' + event.url);
        //window.location.reload();
        this.currentUrl = event.url;
      }
    });*/
  }


}
