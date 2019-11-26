import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import axios from 'axios';
import { Clipboard } from '@ionic-native/clipboard/ngx'
var locales =  require('../locales.js')

declare var QRious: any
@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  language: any = 'en'
  locales: any = locales
  translations: any = {}
  amount: any = 0
  currency: string = 'eur'
  amountLyra: any = 0
  amountFIAT: any = 0
  price: any = 0
  focus: any = ''
  encrypted: string = ''
  wallet: string = ''
  selected: number = 0
  address: string
  encodedData: {}
  public myAngularxQrCode: string = null;
  constructor(private clipboard: Clipboard) { }

  async ngOnInit() {
    const app = this
    
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    
    if (localStorage.getItem('currency') != null) {
      this.currency = localStorage.getItem('currency')
    }
    
    if (localStorage.getItem('language') !== null) {
      app.language = localStorage.getItem('language')
    }
    app.translations = this.locales.default[app.language]

    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    this.calculateQRCode()
    app.price = await app.returnLyraPrice()
  }

  copyAddress() {
    const app = this
    app.clipboard.copy(app.address)
    alert('Address copied!')
  }
  
  calculateQRCode() {
    const app = this
    if (app.amountLyra === 0) {
      app.myAngularxQrCode = app.address
    } else if (app.amountLyra != 0) {
      app.myAngularxQrCode = 'lyra:' + this.address + "?" + "amount=" + app.amountLyra
    }
  }

  returnLyraPrice(){
    const app = this
    return new Promise(response => {
    
    let url = 'https://api.coingecko.com/api/v3/simple/price?ids=scrypta&vs_currencies=' + app.currency

    axios.get(url)
      .then(function (result) {
        let price:number = result.data.scrypta[app.currency]
        response(price)
      })
    })
  }

  fixInputs(what){
    const app = this
    app.focus = what
    if(what === 'lyra'){
      if(app.amountLyra === 0){
        app.amountLyra = ''
      }
      if(app.amountFIAT === '' || app.amountFIAT === 'NaN'  || app.amountFIAT === null){
        app.amountFIAT = 0
      }
    }else{
      if(app.amountFIAT === 0){
        app.amountFIAT = ''
      }
      if(app.amountLyra === '' || app.amountLyra === 'NaN'  || app.amountLyra === null){
        app.amountLyra = 0
      }
    }
  }

  async calculateFIAT() {
    const app = this
    if(app.focus === 'lyra'){
      if(app.amountLyra !== null){
        app.price = await this.returnLyraPrice()
        let calculate = parseFloat(app.amountLyra) * parseFloat(app.price)
        if(calculate.toString() !== "NaN"){
          app.amountFIAT = calculate.toFixed(2)
          this.calculateQRCode()
        }else{
          app.amountFIAT = 0
        }
      }else{
        app.amountFIAT = 0
      }
    }
  }

  async calculateLyra() {
    const app = this
    if(app.focus === 'fiat'){
      if(app.amountFIAT !== null){
        app.price = await this.returnLyraPrice()
        let calculate = parseFloat(app.amountFIAT) / parseFloat(app.price)
        if(calculate.toString() !== "NaN"){
          app.amountLyra = calculate.toFixed(4)
          this.calculateQRCode()
        }else{
          app.amountLyra = 0
        }
      }else{
        app.amountFIAT = 0
      }
    }
  }
}
