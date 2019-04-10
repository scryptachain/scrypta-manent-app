import { Component, OnInit } from '@angular/core';
import axios from 'axios'
@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPage implements OnInit {
  currentPrice:number=0
  valueScrypta:number=0
  valueEur:number=0
  constructor() { }

  ngOnInit() {
   this.getCurrentPrice()
  }

  getCurrentPrice()
  {
    axios.get('https://api.coingecko.com/api/v3/coins/scrypta').then((response)=>{
      this.currentPrice=response.data.market_data.current_price.eur
    })
  }
  
  calculateCurrencyOne()
  {
    this.valueEur=(this.valueScrypta*this.currentPrice*10)
    this.valueEur.toFixed(2)
  }
  calculateCurrencyTwo()
  {
    this.valueScrypta=this.valueEur/this.currentPrice*10
    
  }
}

