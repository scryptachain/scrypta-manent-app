import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { ToastController, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AccountDetailPage } from '../account-detail/account-detail.page';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
var locales =  require('../locales.js')

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})

export class TokenPage implements OnInit {
  language: any = 'en'
  locales: any = locales
  translations: any = {}
  balance: string = '-'
  wallet: ''
  accounts = []
  isParsing: boolean = false
  toggleNoBalance: boolean = true
  encrypted: string = ''
  selected: number = 0
  lyraBalance: any = 0
  idanode: string = 'idanodejs01.scryptachain.org'
  address: string
  transactions = []
  constructor(private clipboard: Clipboard, private toast: ToastController, private modalCtrl: ModalController, public router:Router, private _location: Location, private iab: InAppBrowser) {
    this.router.events.subscribe((val) => {
      this.accounts = []
      this.parseWallet()
    })
   }

  ngOnInit() {
    const app = this
    app.parseWallet()
    if (localStorage.getItem('language') !== null) {
      app.language = localStorage.getItem('language')
    }
    app.translations = this.locales.default[app.language]
  }
  
  async parseWallet() {
    const app = this
    if(app.isParsing === false){
      app.isParsing = true
      app.accounts = []
      if (localStorage.getItem('selected') !== null) {
        app.selected = parseInt(localStorage.getItem('selected'))
      }
      app.wallet = JSON.parse(localStorage.getItem('wallet'))
      let payload = app.wallet[app.selected].split(':')
      app.address = payload[0]
      let balance = await axios.get('https://' + app.idanode + '/balance/' + payload[0])

      let sidechains = await axios.get('https://' + app.idanode + '/sidechain/list')

      for(let x in sidechains.data.data){
        let sidechain = sidechains.data.data[x]
        let sidechainBalance = await axios.post('https://' + app.idanode + '/sidechain/balance', { dapp_address: payload[0], sidechain_address: sidechain.address })
        app.accounts.push({
          address: sidechain.address,
          ticker: sidechain.genesis.symbol,
          name: sidechain.genesis.name,
          balance: sidechainBalance.data.balance
        })
      }
      app.lyraBalance = balance.data.balance.toFixed(4)
      app.isParsing = false
    }
  }
  
 async selectAddress(address){
   const app = this
   if(address === 'main'){
    localStorage.setItem('chain','main')
   }else{
    localStorage.setItem('chain',address)
   }
   alert(app.translations.token.token_selected)
   this.router.navigate(['/dashboard'])
 }

  async doRefresh(event) {
    const app = this
    app.accounts = []
    app.parseWallet()

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  goBack(){
    const app = this
    app.router.navigate(['/dashboard'])
  }

  addAccount() {
    const app = this
    app.router.navigate(['/login-to-wallet/add'])
  }

  async fetchTransactions() {
    const app = this
    axios.get('https://' + app.idanode + 'transactions/' + app.address)
      .then(function (response) {
        app.transactions = response.data['data']
      })
  }

  async openDetails(index) {
    const app = this
    const modal = await this.modalCtrl.create({
      component: AccountDetailPage,
      componentProps: {
        index: index
      }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      app.parseWallet()
    })
    await modal.present()
  }

}