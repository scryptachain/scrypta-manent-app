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
    /*{
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
      url:'/settings'
    },
    {
      title:'Converter',
      url:'/converter'
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
    if(localStorage.getItem('createPasswd')!='')
    {
      var indirizzo=localStorage.getItem('createPasswd').split(':')
      this.localAddress=indirizzo[0]
    }
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(localStorage.getItem('loginDate')!='')
      {
        this.dateLogin=localStorage.getItem('loginDate').substr(0,25)
      }
      this.fetchAddress()
      
    });
  }

  logout()
  {
    
    localStorage.removeItem('createPasswd')
    window.location.reload()
    this.menuCtrl.close()
    this.router.navigate(['/'])

  }
}
