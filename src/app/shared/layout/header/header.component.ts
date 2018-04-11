import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewChecked } from '@angular/core';

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit, AfterViewChecked {
  constructor(private router: Router) { }
  title: string;
  ngOnInit() {
    setTimeout(() => {
      this.title = window.localStorage.getItem('titleHeader');
    }, 0);

  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.title = window.localStorage.getItem('titleHeader');
    }, 0);
  }

  searchMobileActive = false;

  toggleSearchMobile() {
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);
  }
}
