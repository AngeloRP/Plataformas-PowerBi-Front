import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultiIdiomas } from '../../../super/multi-idiomas';
import { TranslateService } from '../../../translate/translate.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: [
    '../auth.css',
  ]
})
export class ForgotComponent extends MultiIdiomas implements OnInit {

  constructor(private router: Router, public translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
  }

  submit(event) {
    event.preventDefault();
    this.router.navigate(['/dashboard/+analytics'])
  }
}
