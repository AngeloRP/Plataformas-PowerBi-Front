import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "../../utils/notification.service";

declare var $: any;

@Component({
  selector: 'sa-logout',
  template: `
<div id="logout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a routerlink="/auth/login" class="logout_class" title="Sign Out" data-action="userLogout"
                  data-logout-msg="Desea salir del sistema?"><i
          class="fa fa-sign-out"></i></a> </span>
    </div>
  `,
  styleUrls: [
    './logout.component.css'
  ]
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
    private notificationService: NotificationService) { }

  showPopup() {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Desea desloguearse <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content: "",
      buttons: '[No][Si]'

    }, (ButtonPressed) => {
      if (ButtonPressed === "Si") {
        this.logout()
      }
    });
  }

  logout() {
    window.localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  ngOnInit() {

  }



}
