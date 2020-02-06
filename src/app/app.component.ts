import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router'
import { Globalization } from '@ionic-native/globalization/ngx';
var locales =  require('./locales.js')

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  language: any = 'en'
  locales: any = locales
  translations: any = {}
  public appPages = [];
  private dateLogin: string
  private localAddress: string
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController,
    private globalization: Globalization
  ) {
    this.initializeApp();
    const app = this
    if (localStorage.getItem('language') !== null) {
      app.language = localStorage.getItem('language')
    }
    app.translations = this.locales.default[app.language]
    app.appPages = [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'apps'
      },
      {
        title: app.translations.ui.identities,
        url: '/account',
        icon: 'journal'
      },
      {
        title: app.translations.token.title,
        url: '/token',
        icon: 'wallet'
      },
      {
        title: app.translations.ui.contacts,
        url: '/address-book',
        icon: 'contact'
      },
      {
        title: 'Backup',
        url: '/backup',
        icon: 'save'
      },
      {
        title: app.translations.ui.settings,
        url: '/settings',
        icon: 'settings'
      }
    ]

    if (localStorage.getItem('theme') !== null) {
      if(localStorage.getItem('theme') === 'dark'){
        document.body.classList.add("dark")
      }
    }
  }

  fetchAddress() {
    if (localStorage.getItem('lyraWallet') !== null) {
      var indirizzo = localStorage.getItem('lyraWallet').split(':')
      this.localAddress = indirizzo[0]
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('ios') === true ){
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
      }
      this.fetchAddress()
    });
  }

}
