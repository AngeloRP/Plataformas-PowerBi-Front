import { Injectable } from '@angular/core';
import { NotificationService } from '../../../shared/utils/notification.service';
import { Http } from '@angular/http';
import { ApiService } from 'app/core/api/api.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService extends ApiService {

  constructor(
    public http: Http,
    public notificationService: NotificationService,
    private router: Router
  ) {
    super(http, [], notificationService);
    this.webAddress.addUrl('loginUsuario');
  }

  login(body: { email: string, password: string }): Promise<void> {
    return this.postData(body, true).then(() => {
      window.localStorage.setItem('email', this.results.email);
      window.localStorage.setItem('userInformation', this.results.name);
      window.localStorage.setItem('category', this.results.category);
      this.router.navigate(['/']);
    }).catch(
      error => {
        console.log('Error:' + error);
      }
    );
  }



}
