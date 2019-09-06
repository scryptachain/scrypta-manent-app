import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../windowservice';
import axios from 'axios'
import { checkNoChanges } from '@angular/core/src/render3/instructions';
import { unwatchFile } from 'fs';
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
  @ViewChild('passwordSend') mypassword;
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
      axios.get('https://microexplorer.scryptachain.org/balance/' + app.address)
        .then(function (response) {
          app.balance = response.data['balance']
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
      if(app.amountFIAT === ''){
        app.amountFIAT = 0
      }
    }else{
      if(app.amountFIAT === 0){
        app.amountFIAT = ''
      }
      if(app.amountToSend === ''){
        app.amountToSend = 0
      }
    }
  }

  async calculateFIAT() {
    const app = this
    if(app.focus === 'lyra'){
      app.price = await this.returnLyraPrice()
      app.amountFIAT = parseFloat(app.amountToSend) * parseFloat(app.price)
      app.amountFIAT = app.amountFIAT.toFixed(2)
    }
  }

  async calculateLyra() {
    const app = this
    if(app.focus === 'fiat'){
      app.price = await this.returnLyraPrice()
      app.amountToSend = parseFloat(app.amountFIAT) / parseFloat(app.price)
      app.amountToSend = app.amountToSend.toFixed(4)
    }
  }

  checkIdaNodes() {
    var checknodes = this._window.ScryptaCore.returnNodes();
    const app = this
    for (var i = 0; i < checknodes.length; i++) {
      axios.get('https://' + checknodes[i] + '/check').then(function (response) {
        app.nodes.push(response.data.name)
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
  
  pasteAddress(){

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
      await this._window.ScryptaCore.send(app.unlockPwd, '', app.addressToSend, app.amountToSend, '', '', app.address + ':' + app.encrypted).then((result) => {
        if(result !== false){
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
      console.log('barcode', barcodeData)
      let check = barcodeData.text.split('?')
      if(check[1] !== undefined){
        var amount = check[1].replace('amount:','')
        app.amountToSend = parseFloat(amount)
      }
      this.addressToSend = barcodeData.text
      document.getElementById('password').style.display = 'block';
      document.getElementById('buttonSend').style.display = 'block';
      this.mypassword.setFocus()
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
