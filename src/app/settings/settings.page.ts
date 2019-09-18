import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currency: string = 'eur'
  theme: string = 'light'

  constructor(private router: Router, private _location: Location) {
    if (localStorage.getItem('currency') != null) {
      this.currency = localStorage.getItem('currency')
    }
    if (localStorage.getItem('theme') != null) {
      this.theme = localStorage.getItem('theme')
    }
  }

  goBack() {
    const app = this
    app.router.navigate(['/dashboard'])
  }

  ngOnInit() {
    //this.currency='eur';
  }

  changeCurrency() {
    localStorage.setItem('currency', this.currency)
    this.currency = this.currency
  }

  changeTheme() {
    if (localStorage.getItem('theme') !== null) {
      if(localStorage.getItem('theme') === 'dark' && this.theme === 'light'){
        document.body.classList.remove("dark")
      }
    }
    localStorage.setItem('theme', this.theme)
    if(this.theme === 'dark'){
      document.body.classList.add("dark")
    }
    this.theme = this.theme
  }

}
