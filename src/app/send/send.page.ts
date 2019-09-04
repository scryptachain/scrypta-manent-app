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
  amountToSend: number;
  addressToSend: string;
  unlockPwd: string;
  decrypted_wallet: string;
  private_key: any;
  api_secret: any;
  isSending: boolean;
  messageToSend: any;
  balance: any = '-';
  @ViewChild('passwordSend') mypassword;
  constructor(windowRef: WindowRefService, private qrScanner: BarcodeScanner, private router: Router) {
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    app.getBalance()
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
    await this._window.ScryptaCore.send(app.unlockPwd, '', app.addressToSend, app.amountToSend, '', '', app.address + ':' + app.encrypted).then((result) => {
      if(result !== false){
        this.router.navigate(['/successfulsend'])
      }else{
        alert('Transaction failed, please retry!')
      }
    }).catch((err) => {
      console.log(err)
    });
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
