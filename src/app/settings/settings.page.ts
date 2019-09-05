import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {Location} from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currency:string
  constructor(private router:Router, private _location: Location) { 
    if(localStorage.getItem('currency')!=null)
    {
      this.currency=localStorage.getItem('currency')
    }
    else{
      this.currency=null
    }
  }
  
  goBack(){
    this._location.back()
  }

  ngOnInit() {
    //this.currency='eur';
  }

  changeCurrency()
  {
    localStorage.setItem('currency',this.currency)
    this.currency=this.currency
  }

}
