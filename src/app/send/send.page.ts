import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../windowservice';
import axios from 'axios'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
var locales =  require('../locales.js')
import { NFC } from '@ionic-native/nfc/ngx'
import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  language: any = 'en'
  locales: any = locales
  translations: any = {}
  private _window: ICustomWindow;
  wallet: ''
  encrypted: string = ''
  selected: number = 0
  address: string
  ticker: any = ''
  nodes: string[] = [];
  unconfirmed = []
  connected: string = '';
  haveNFC: boolean = true
  guestWallet: any = ''
  nfcreader:any
  isIOS: boolean = false
  showQR: boolean = false
  public_address: string;
  chain: string = 'main';
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
  showNFC: boolean = false
  balance: any = '-';
  isSending: boolean = false;
  currency: string = 'eur'
  constructor(private nfc: NFC, public platform: Platform, public activatedRoute: ActivatedRoute,windowRef: WindowRefService, private qrScanner: BarcodeScanner, private router: Router) {
    const app = this
    app._window = windowRef.nativeWindow;
    app.platform.ready().then(async () => {
      if(this.platform.is('ios') === true ){
        app.isIOS = true
      }
    })
  }

  async ngOnInit() {
    const app = this
    
    if(this.activatedRoute.snapshot.paramMap.get('address') !== undefined){
      this.addressToSend = this.activatedRoute.snapshot.paramMap.get('address')
    }

    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    
    if (localStorage.getItem('currency') !== null) {
      app.currency = localStorage.getItem('currency')
    }
    
    if (localStorage.getItem('chain') !== null) {
      app.chain = localStorage.getItem('chain')
    }
    
    if (localStorage.getItem('language') !== null) {
      app.language = localStorage.getItem('language')
    }
    app.translations = this.locales.default[app.language]

    app.currency_placeholder = 'Calculate in ' + app.currency.toUpperCase()
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    await app.getUnconfirmed()
    app.getBalance()
    app.price = await app.returnLyraPrice()
  }

  receiveCardiOS(){
    const app = this
    this.nfc.enabled().then(() => {
      this.nfc.beginSession().subscribe(() => {
        this.nfc.addNdefListener(() => {}).subscribe((event: any) => {
          let NFC = this.nfc.bytesToString(event.tag.ndefMessage[0].payload)
          var hex  = NFC.toString();
          let address = hex.substr(3)
          app.guestWallet = address
          let split = address.split(':')
          app.addressToSend = split[0]
          app.closeSession()
        });
      });
    }, () => {
      alert(app.translations.identities.no_nfc);
    });
  }

  closeSession(){
    const app = this
    app.nfcreader.invalidateSession(success => {
      console.log('Can\'t close session')
    }, error => {
      alert(app.translations.identities.no_nfc)
    })
  }

  receiveCardAndroid() {
    const app = this
      app.nfcreader = this.nfc.addNdefListener(() => {
        app.showNFC = true
      }, (err) => {
        alert(app.translations.identities.no_nfc);
      }).subscribe(async (event) => {
        app.showNFC = false
        let NFC = this.nfc.bytesToHexString(event.tag.ndefMessage[0].payload)
        var hex  = NFC.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        let address = str.substr(3)
        app.guestWallet = address
        let split = address.split(':')
        app.addressToSend = split[0]
        app.nfcreader.unsubscribe()
    })
  }
  
  closeNFC(){
    const app = this
    app.nfcreader.unsubscribe()
    app.showNFC = false
  }

  openModalQR() {
    const app = this
    if(app.showQR === false){
      app.showQR = true
    }else{
      app.showQR = false
    }
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

  async getUnconfirmed(){
    const app = this
    app.unconfirmed = []
    return new Promise(response => {
      let unconfirmed = []
      let stored = localStorage.getItem('pendingtx')
      if(stored !== null){
        unconfirmed = JSON.parse(stored)
      }
      if(unconfirmed.length > 0){
        for(let k in unconfirmed){
          if(unconfirmed[k].from === app.address){
            app.unconfirmed.push(unconfirmed[k])
          }
        }
      }
      response(true)
    })
  }

  async getBalance() {
    const app = this

    if(app.chain !== 'main'){
      let sidechainBalance = await axios.post('https://' + app.idanode + '/sidechain/balance', { dapp_address: app.address, sidechain_address: app.chain })
      app.ticker = sidechainBalance.data.symbol
      app.balance = sidechainBalance.data.balance
    }else{
      axios.get('https://' + app.idanode + '/balance/' + app.address)
        .then(function (response) {
          app.balance = response.data['balance'].toFixed(4)
          for(let k in app.unconfirmed){
            app.balance = parseFloat(app.balance) - parseFloat(app.unconfirmed[k].value)
          }
          app.balance = parseFloat(app.balance).toFixed(4)
        })
    }
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
    } else if(what === 'sidechain'){
      if(app.amountToSend === 0){
        app.amountToSend = ''
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
        app._window.ScryptaCore.readKey(app.unlockPwd, app.address + ':' + app.encrypted).then(async function (response) {
          if (response !== false) {
            app.private_key = response.key
            app.api_secret = response.api_secret
            if(app.chain === 'main'){
              app.sendLyra();
            }else{
              let responseSend = await axios.post('https://' + app.idanode + '/sidechain/send', 
                { 
                  from: app.address, 
                  private_key: response.prv,
                  pubkey: response.key,
                  sidechain_address: app.chain,
                  to: app.addressToSend,
                  amount: app.amountToSend
                })
              app.isSending = false
              if(responseSend.data !== false){
                alert(app.translations.send.sent_successful)
              }else{
                alert(app.translations.token.send_fail)
              }
            }
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
      app.amountToSend = parseFloat(String(app.amountToSend).replace(',','.'))
      await this._window.ScryptaCore.send(app.unlockPwd, app.addressToSend, app.amountToSend, '', app.address + ':' + app.encrypted).then((result) => {
        if(result !== false && result !== undefined && result !== null){
          let stored = localStorage.getItem('pendingtx')
          let unconfirmed = []
          if(stored !== null){
            unconfirmed = JSON.parse(stored)
          }
          unconfirmed.push({
            txid: result,
            value: parseFloat(app.amountToSend) + 0.001,
            address: app.addressToSend,
            from: app.address
          })
          localStorage.setItem('pendingtx',JSON.stringify(unconfirmed))
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
      barcodeData.text = barcodeData.text.replace('lyra:','').replace('scrypta:','')
      let check = barcodeData.text.split('?')
      if(check[1] !== undefined){
        var amount = check[1].replace('amount=','')
        app.amountToSend = parseFloat(amount).toFixed(8).replace(',','.')
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
