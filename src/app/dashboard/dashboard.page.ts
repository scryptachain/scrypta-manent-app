import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { forEach } from '@angular/router/src/utils/collection';
import { ChartModule } from 'angular2-highcharts';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { transcode } from 'buffer';
//import {ChartModule } from 'angular2-highcharts'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  

})


export class DashboardPage implements OnInit {
 
  balance:string=''
  lyra:number;
  value:string;
  valore:number;
  options:any;
  dati:any;
  transactions=[]
  
  
  constructor() { 
    
   
    

    }



  


  ngOnInit() {
    this.fetchTransactions();
    this.balance=(JSON.parse(localStorage.getItem('balance')));
    console.log(this.balance)
   
    console.log('asdasdasd',this.transactions)
    var lyra=this.balance['data']
    this.lyra=lyra;
    console.log(lyra)
   this.checkValore();
   this.fetchGraph();
   
   //console.log(this.value)
   console.log('initial',this.options)
    
  }

  fetchTransactions()
  {
    var transazioni=JSON.parse(localStorage.getItem('transactions'));
   
    for(var i=0;i<transazioni.data.length;i++)
    {
      this.transactions.push(transazioni.data[i]);
    }
    console.log(this.transactions)
  }
  fetchGraph()
  {
    var app=this;
    
    axios.get("https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=eur&days=30")
    .then(function(response) {
     
     app.dati=response.data.prices
     console.log(app.dati)
     
     app.options={
    
      series: [
        {
          data:app.dati,
          type: "spline",
          zIndex: 0,
          marker: {
            enabled: false
          },
          name: "Price EUR"
        }
      ],
      
      yAxis: {
        title: {
          text: "price"
        }
      },
      xAxis: {
        type: "datetime",
        tickInterval: 24 * 3600 * 1000  
      },
      credits: {
        enabled: false
      },
      chart: {
        backgroundColor: "transparent"
      },
      title: {
        text: app.lyra+' LYRA'
      },
      subtitle:{
        text:app.value+' EUR'
      }
      
    }
      
    });
  } 
  checkValore()
  {
   
    axios.get('https://api.coingecko.com/api/v3/coins/scrypta/').then((response=>{
     // console.log(response);
      console.log(typeof(response.data.market_data.current_price.eur))
      //this.valore=response.data.market_data.current_price.eur
      this.valore=response.data.market_data.current_price.eur
      this.calcolo();
    }))
    
      
    
  }

  calcolo()
  {
   // console.log(this.valore)
    this.value=(Number(this.lyra)*this.valore).toFixed(2)
   
    
}
}