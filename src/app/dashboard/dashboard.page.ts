import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { forEach } from '@angular/router/src/utils/collection';
import { ChartModule } from 'angular2-highcharts';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { transcode } from 'buffer';
import { ModalController } from '@ionic/angular';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';
import { OverlayEventDetail } from '@ionic/core';
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
  currency:string
  
  constructor(private modalCtrl:ModalController) { 
    
   
    

    }



  


  ngOnInit() {
    
    
    this.balance=(JSON.parse(localStorage.getItem('balance')));
    console.log(this.balance)
   
    //console.log('asdasdasd',this.transactions)
    var lyra=this.balance['data']
    this.lyra=lyra;
    this.currency=localStorage.getItem('currency')
    console.log(lyra)
   this.checkValore();
   
   this.fetchGraph();
   
   //console.log(this.value)
   console.log('initial',this.options)
    
  }

  
  async fetchTransactions()
  {

    var transazioni=JSON.parse(await localStorage.getItem('transactions2'));
   
    for(var i=0;i<transazioni.data.length;i++)
    {
      await this.transactions.push(transazioni.data[i]);
    }
    console.log(this.transactions)
  }
  async fetchGraph()
  {
    var app=this;
    var currency=localStorage.getItem('currency')
    var url:string
    if(currency==null)
    {
      url='https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=eur&days=30'
    }
    else if(currency=='eur')
    {
      url='https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=eur&days=30'
    }
    else if(currency=='usd')
    {
      url='https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=usd&days=30'
    }
    else if(currency=='gbp')
    {
      url='https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=gbp&days=30'
    }
    axios.get(url)
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
          name: "Price "+currency.toUpperCase()
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
        backgroundColor: "white",
        borderColor:"#335cad",
        //borderRadius: 100
        //borderRadiusBottomRight:"100px"
      },
      title: {
        text: app.lyra+' LYRA',
        style:{"color":"black","font-size":"20px"}
        
      },
      subtitle:{
        text:app.value+' '+currency.toUpperCase(),
        style:{"font-size":"13px","color":"#365ace","margin-top":"-15%"}
      }
      
    }
      
    });
  } 
  async checkValore()
  { 
   
    axios.get('https://api.coingecko.com/api/v3/coins/scrypta/').then((response=>{
     // console.log(response);
      if(this.currency==null){
      //console.log(typeof(response.data.market_data.current_price.eur))
      this.valore=response.data.market_data.current_price.eur
      }

      else if(this.currency=='eur')
      {
        //console.log(typeof(response.data.market_data.current_price.eur))
        this.valore=response.data.market_data.current_price.eur

      }
      else if(this.currency=='usd')
      {
        //console.log(typeof(response.data.market_data.current_price.eur))
        this.valore=response.data.market_data.current_price.usd
      }
      else if(this.currency=='gbp')
      {
        //console.log(typeof(response.data.market_data.current_price.eur))
        this.valore=response.data.market_data.current_price.gbp
      }
      this.fetchTransactions();
      this.calcolo();
    }))
    
      
    
  }

  async calcolo()
  {
   // console.log(this.valore)
    this.value=(Number(this.lyra)*this.valore).toFixed(2)
   
    
}

doRefresh(event) {
  console.log('Begin async operation');
  window.location.reload()

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}


async openDetails(response)
{
  console.log(response)
  const modal= await this.modalCtrl.create({
    component:ModaltransactionPage,
    componentProps:{
      response:response
    }
  });
  modal.onDidDismiss().then((detail:OverlayEventDetail)=>{
    if(detail!=null)
    {
      console.log(detail);
      
    }
  })
  await modal.present()
}
}