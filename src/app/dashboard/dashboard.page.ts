import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  balance:string=''
  lyra:string='';
  value:number;
  valore:number;

  constructor() { }


  ngOnInit() {
    this.balance=(JSON.parse(localStorage.getItem('balance')));
    console.log(this.balance)
    
    var lyra=this.balance['data']
    this.lyra=lyra;
    console.log(lyra)
   this.checkValore();
   console.log(this.value)
  }

  checkValore()
  {
    
    axios.get('https://api.coingecko.com/api/v3/coins/scrypta/').then((response=>{
      console.log(response);
      console.log(typeof(response.data.market_data.current_price.eur))
      //this.valore=response.data.market_data.current_price.eur
      this.valore=response.data.market_data.current_price.eur
      this.calcolo();
    }))
    
     
    
  }

  calcolo()
  {
    console.log(this.valore)
    this.value=Number(this.lyra)*this.valore
  }

}
