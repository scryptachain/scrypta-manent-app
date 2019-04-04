import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
     
    },
    /*{
      title: 'List',
      url: '/list',
      icon: 'list'
    }*/
    {
      title:'Dashboard',
      url:'/dashboard'
    },
    {
      title:'Backup',
      url:'/backup'
    },
    {
      title:'Card Settings',
      url:'/card-settings'
    },
    {
      title:'General Settings',
      url:'/general-settings'
    },
    {
      title:'Converter',
      url:'/converter'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
