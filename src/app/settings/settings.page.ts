import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currency:string
  constructor() { 
    if(localStorage.getItem('currency')!=null)
    {
      this.currency=localStorage.getItem('currency')
    }
    else{
      this.currency=null
    }
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
