import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ChartModule } from 'angular2-highcharts';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { transcode } from 'buffer';
import { ModalController } from '@ionic/angular';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';
import { OverlayEventDetail } from '@ionic/core';
import { WindowRefService, ICustomWindow } from '../windowservice';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import {ChartModule } from 'angular2-highcharts'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {
  wallet = []
  address: string = ''
  selected: number = 0
  balance: string = '-'
  encrypted: string = ''
  lyra: number;
  value: string = '0';
  idanode: string = 'idanodejs01.scryptachain.org'
  valueBTC: string = '0';
  valore: number;
  options: any;
  dati: any;
  transactions = []
  currency: string = 'eur'
  current_price: any = 0
  private _window: ICustomWindow;
  constructor(
    windowRef: WindowRefService,
    private modalCtrl: ModalController,
    private iab: InAppBrowser
  ) {
    this._window = windowRef.nativeWindow;

  }

  async ngOnInit() {
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]

    await this.getBalance()
    await this.fetchTransactions()
    this.fetchGraph()

  }

  async getBalance() {
    const app = this
    if (localStorage.getItem('currency') !== null) {
      app.currency = localStorage.getItem('currency')
    }

    let url = 'https://api.coingecko.com/api/v3/simple/price?ids=scrypta&vs_currencies=btc,' + app.currency
    axios.get(url)
      .then(function (result) {
        let price: number = result.data.scrypta[app.currency]
        var priceBTC = result.data.scrypta['btc']
        app.current_price = price
        axios.get('https://' + app.idanode + '/balance/' + app.address)
          .then(function (response) {
            app.balance = response.data['balance'].toFixed(4)
            app.value = (parseFloat(app.balance) * parseFloat(app.current_price)).toFixed(4)
            app.valueBTC = (parseFloat(app.balance) * parseFloat(priceBTC)).toFixed(8)
          })
      }).catch(error => {
        this.getBalance()
      })
  }

  async fetchTransactions() {
    const app = this
    axios.get('https://' + app.idanode + '/transactions/' + app.address)
      .then(function (response) {
        app.transactions = response.data['data']
      })
  }

  async fetchGraph() {
    var app = this;
    app.currency = 'eur'
    if (localStorage.getItem('currency') !== null) {
      app.currency = localStorage.getItem('currency')
    }
    var url: string
    if (app.currency == 'eur') {
      url = 'https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=eur&days=30'
    }
    else if (app.currency == 'usd') {
      url = 'https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=usd&days=30'
    }
    else if (app.currency == 'gbp') {
      url = 'https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=gbp&days=30'
    }
    axios.get(url)
      .then(function (response) {

        app.dati = response.data.prices

        app.options = {

          series: [
            {
              data: app.dati,
              type: "spline",
              zIndex: 0,
              marker: {
                enabled: false
              },
              name: "Price " + app.currency.toUpperCase()
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
            borderColor: "#335cad",
            //borderRadius: 100
            //borderRadiusBottomRight:"100px"
          },
          title: {
            text: '',
            style: { "color": "black", "font-size": "20px" }
          },
          subtitle: {
            text: app.current_price + ' ' + app.currency.toUpperCase(),
            style: { "font-size": "13px", "color": "#365ace", "margin-top": "-15%" }
          }

        }

      });
  }


  async doRefresh(event) {
    const app = this
    await app.getBalance()
    app.fetchGraph()
    app.fetchTransactions()

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  openDetails(response) {
    this.iab.create('https://explorer.scryptachain.org/transaction/' + response.txid, '_system', 'location=yes')
  }
}