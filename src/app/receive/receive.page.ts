import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import axios from 'axios';

declare var QRious: any
@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  amount: any = 0
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

  async ngOnInit() {
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    this.calculateQRCode()
    app.price = await app.returnLyraPrice()
  }

  calculateQRCode() {
    const app = this
    if (app.amountLyra === 0) {
      app.myAngularxQrCode = app.address
    } else if (app.amountLyra != 0) {
      app.myAngularxQrCode = this.address + "?" + "amount:" + app.amountLyra
    }
  }

  returnLyraPrice(){
    return new Promise(response => {
      var currency = 'eur'
    if (localStorage.getItem('currency') !== null) {
      currency = localStorage.getItem('currency')
    }
  
    let url = 'https://api.coingecko.com/api/v3/simple/price?ids=scrypta&vs_currencies=' + currency

    axios.get(url)
      .then(function (result) {
        let price:number = result.data.scrypta[currency]
        response(price)
      })
    })
  }

  fixInputs(what){
    const app = this
    app.focus = what
    if(what === 'lyra'){
      console.log(app.amountLyra)
      if(app.amountLyra === 0){
        app.amountLyra = ''
      }
      if(app.amountFIAT === ''){
        app.amountFIAT = 0
      }
    }else{
      if(app.amountFIAT === 0){
        app.amountFIAT = ''
      }
      if(app.amountLyra === ''){
        app.amountLyra = 0
      }
    }
  }

  async calculateFIAT() {
    const app = this
    if(app.focus === 'lyra'){
      app.price = await this.returnLyraPrice()
      app.amountFIAT = parseFloat(app.amountLyra) * parseFloat(app.price)
      app.amountFIAT = app.amountFIAT.toFixed(2)
      app.calculateQRCode()
    }
  }

  async calculateLyra() {
    const app = this
    if(app.focus === 'fiat'){
      app.price = await this.returnLyraPrice()
      app.amountLyra = parseFloat(app.amountFIAT) / parseFloat(app.price)
      app.amountLyra = app.amountLyra.toFixed(4)
      app.calculateQRCode() 
    }
  }
}
