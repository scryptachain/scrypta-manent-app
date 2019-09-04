import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title:'Accounts',
      url:'/account'
    },
    {
      title:'Backup',
      url:'/backup'
    },
    {
      title:'General Settings',
      url:'/settings'
    }
  ];
  private dateLogin:string
  private localAddress:string
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private menuCtrl:MenuController,
    
  ) {
    this.initializeApp();
    //this.fetchAddress();
  }
  fetchAddress()
  {
    if(localStorage.getItem('lyraWallet') !== null)
    {
      var indirizzo=localStorage.getItem('lyraWallet').split(':')
      this.localAddress=indirizzo[0]
    }
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fetchAddress()
      
    });
  }

  logout()
  {
    
    localStorage.removeItem('lyraWallet')
    window.location.reload()
    this.menuCtrl.close()
    this.router.navigate(['/'])

  }
}
