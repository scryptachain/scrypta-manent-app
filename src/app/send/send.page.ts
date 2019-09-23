import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../windowservice';
import axios from 'axios'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  private _window: ICustomWindow;
  wallet: ''
  encrypted: string = ''
  selected: number = 0
  address: string
  nodes: string[] = [];
  connected: string = '';
  public_address: string;
  idanode: string = 'idanodejs01.scryptachain.org'
  encrypted_wallet: string;
  amountToSend: any = 0;
  addressToSend: string;
  unlockPwd: string;
  decrypted_wallet: string;
  private_key: any;
  api_secret: any;
  focus: any = '';
  messageToSend: any;
  amountFIAT: any = 0;
  currency_placeholder: any = ''
  price: any = 0
  balance: any = '-';
  isSending: boolean = false;
  currency: string = 'eur'
  constructor(windowRef: WindowRefService, private qrScanner: BarcodeScanner, private router: Router) {
    this._window = windowRef.nativeWindow;
  }

  async ngOnInit() {
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    if (localStorage.getItem('currency') !== null) {
      app.currency = localStorage.getItem('currency')
    }
    app.currency_placeholder = 'Calculate in ' + app.currency.toUpperCase()
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    app.getBalance()
    app.price = await app.returnLyraPrice()
  }

  returnLyraPrice(){
    const app = this
    return new Promise(response => {
    if (localStorage.getItem('currency') !== null) {
      app.currency = localStorage.getItem('currency')
    }
  
    let url = 'https://api.coingecko.com/api/v3/simple/price?ids=scrypta&vs_currencies=' + app.currency

    axios.get(url)
      .then(function (result) {
        let price:number = result.data.scrypta[app.currency]
        response(price)
      })
    })
  }

  async getBalance() {
    const app = this
    app._window.ScryptaCore.connectNode().then(async function (response) {
      axios.get('https://' + app.idanode + '/balance/' + app.address)
        .then(function (response) {
          app.balance = response.data['balance'].toFixed(4)
        })
    })
  }

  fixInputs(what){
    const app = this
    app.focus = what
    if(what === 'lyra'){
      if(app.amountToSend === 0){
        app.amountToSend = ''
      }
      if(app.amountFIAT === '' || app.amountFIAT === 'NaN'  || app.amountFIAT === null){
        app.amountFIAT = 0
      }
    }else{
      if(app.amountFIAT === 0){
        app.amountFIAT = ''
      }
      if(app.amountToSend === '' || app.amountToSend === 'NaN'  || app.amountToSend === null){
        app.amountToSend = 0
      }
    }
  }

  async calculateFIAT() {
    const app = this
    if(app.focus === 'lyra'){
      if(app.amountToSend !== null){
        app.price = await this.returnLyraPrice()
        let calculate = parseFloat(app.amountToSend) * parseFloat(app.price)
        if(calculate.toString() !== "NaN"){
          app.amountFIAT = calculate.toFixed(2)
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
          app.amountToSend = calculate.toFixed(4)
        }else{
          app.amountToSend = 0
        }
      }else{
        app.amountFIAT = 0
      }
    }
  }

  checkIdaNodes() {
    var checknodes = this._window.ScryptaCore.returnNodes();
    const app = this
    for (var i = 0; i < checknodes.length; i++) {
      axios.get('https://' + checknodes[i] + '/wallet/getinfo').then(function (response) {
        app.nodes.push(response.data.blocks)
        if (i == checknodes.length) {
          app.connectToNode()
        }
      })
    }
  }

  connectToNode() {
    var app = this
    if (app.connected == '') {
      app.connected = app.nodes[Math.floor(Math.random() * app.nodes.length)]
    }
  }
  
  unlockWallet() {
    const app = this
    if (app.unlockPwd !== '' && app.addressToSend !== '' && app.amountToSend > 0) {
      if(app.amountToSend < app.balance){
        app.decrypted_wallet = 'Wallet Locked'
        app._window.ScryptaCore.readKey(app.unlockPwd, app.address + ':' + app.encrypted).then(function (response) {
          if (response !== false) {
            app.private_key = response.key
            app.api_secret = response.api_secret
            app.sendLyra();
          } else {
            alert('Wrong Password')
          }
        })
      }else{
        alert('Insufficient funds!')
      }
    } else {
      alert('Fill all the fields!')
    }
  }

  async sendLyra() {
    const app = this
    if(app.isSending === false){
      app.isSending = true
      await this._window.ScryptaCore.send(app.unlockPwd, '', app.addressToSend, app.amountToSend, '', 0.001, app.address + ':' + app.encrypted).then((result) => {
        if(result !== false && result !== undefined){
          app.amountFIAT = 0
          app.amountToSend = 0
          app.addressToSend = ''
          app.unlockPwd = ''
          this.router.navigate(['/successfulsend'])
        }else{
          alert('Transaction failed, please retry!')
        }
        app.isSending = false
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  scanQRCode() {
    const app = this
    this.qrScanner.scan().then(barcodeData => {
      barcodeData.text = barcodeData.text.replace('lyra:','')
      let check = barcodeData.text.split('?')
      if(check[1] !== undefined){
        var amount = check[1].replace('amount=','')
        app.amountToSend = parseFloat(amount)
        this.addressToSend = check[0]
      }else{
        this.addressToSend = barcodeData.text
      }
      document.getElementById('password').style.display = 'block';
      document.getElementById('buttonSend').style.display = 'block';
    }).catch(err => {
      console.log(err)
    })

  }

  unlockButton() {
    const app = this
    if (app.unlockPwd !== '' && app.addressToSend !== '' && app.amountToSend > 0) {
      if(app.amountToSend < app.balance){
        document.getElementById('buttonSend').style.opacity = '1'
      }else{
        document.getElementById('buttonSend').style.opacity = '0.5'
      }
    }else{
      document.getElementById('buttonSend').style.opacity = '0.5'
    }
  }
}
