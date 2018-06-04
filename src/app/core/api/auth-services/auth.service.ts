import { Injectable } from '@angular/core';
import { NotificationService } from '../../../shared/utils/notification.service';
import { Http } from '@angular/http';
import { ApiService } from 'app/core/api/api.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    public api: ApiService,
    private router: Router
  ) {
    // super(http, [], notificationService);
    this.api.webAddress.addUrl('loginUsuario');
  }

  login(body: { email: string, password: string }): Promise<void> {
    return this.api.postData(body, true).then(() => {
      window.localStorage.setItem('email', this.api.results.email);
      window.localStorage.setItem('userInformation', this.api.results.name);
      window.localStorage.setItem('category', this.api.results.category);
      this.router.navigate(['/']);
    }).catch(
      error => {
        console.log('Error:' + error);
      }
    );
  }



}
