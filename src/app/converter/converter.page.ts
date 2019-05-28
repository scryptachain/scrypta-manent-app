import { Component, OnInit } from '@angular/core';
import axios from 'axios'
@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPage implements OnInit {
  currentPrice:number
  valueScrypta:number
  valueEur:number
  stringcurrency:string='EUR'
  currency:string
  constructor() {}

  ngOnInit() {
    this.getCurrentPrice()
   this.currentPrice=0;
   this.valueEur=0;
   this.valueScrypta=0;
  }

   getCurrentPrice()
  {
    if(localStorage.getItem('currency')=='eur')
    {
    axios.get('https://api.coingecko.com/api/v3/coins/scrypta').then((response)=>{
      this.currentPrice=response.data.market_data.current_price.eur
    })
  }

  else if(localStorage.getItem('currency')=='usd'){
    
    var currency=localStorage.getItem('currency')
    //this.currency=currency
    this.stringcurrency=currency.toUpperCase()
    
    axios.get('https://api.coingecko.com/api/v3/coins/scrypta').then((response)=>{
      console.log(response)
      this.currentPrice=response.data.market_data.current_price.usd
      console.log(this.currentPrice)
    })
    }

    else if(localStorage.getItem('currency')=='gbp')
    {
      
    var currency=localStorage.getItem('currency')
    //this.currency=currency
    this.stringcurrency=currency.toUpperCase()
    
    axios.get('https://api.coingecko.com/api/v3/coins/scrypta').then((response)=>{
      console.log(response)
      this.currentPrice=response.data.market_data.current_price.gbp
      console.log(this.currentPrice)

    })
  }
  }
  
   calculateCurrencyOne()
  {

    console.log(this.valueScrypta)
    var valore:any
    valore=(this.valueScrypta*this.currentPrice).toFixed(2)
    this.valueEur=valore
  }
   calculateCurrencyTwo()
  {
    var valore
    valore=(this.valueEur/this.currentPrice).toFixed(2)
    this.valueScrypta=valore
    
  }
}

