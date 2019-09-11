import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'card'
    },
    {
      title: 'Accounts',
      url: '/account',
      icon: 'wallet'
    },
    {
      title: 'Backup',
      url: '/backup',
      icon: 'save'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];
  private dateLogin: string
  private localAddress: string
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private router: Router,
    private menuCtrl: MenuController,

  ) {
    this.initializeApp();
    //this.fetchAddress();
  }
  fetchAddress() {
    if (localStorage.getItem('lyraWallet') !== null) {
      var indirizzo = localStorage.getItem('lyraWallet').split(':')
      this.localAddress = indirizzo[0]
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      if(this.platform.is('ios') === true ){
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
      }
      this.fetchAddress()
    });
  }

  logout() {

    localStorage.removeItem('lyraWallet')
    window.location.reload()
    this.menuCtrl.close()
    this.router.navigate(['/'])

  }
}
