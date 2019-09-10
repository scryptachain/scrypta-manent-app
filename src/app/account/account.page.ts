import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { ToastController, ModalController } from '@ionic/angular';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';
import { OverlayEventDetail } from '@ionic/core';
import { AccountDetailPage } from '../account-detail/account-detail.page';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {
  balance: string = '-'
  wallet: ''
  accounts = []
  toggleNoBalance: boolean = true
  encrypted: string = ''
  selected: number = 0
  address: string
  transactions = []
  constructor(private clipboard: Clipboard, private toast: ToastController, private modalCtrl: ModalController, public router:Router, private _location: Location, private iab: InAppBrowser) { }

  ngOnInit() {
    const app = this
    app.parseWallet()
  }
  
  async parseWallet() {
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    for (let i = 0; i < app.wallet.length; i++) {
      let payload = app.wallet[i].split(':')
      let transactions = await axios.get('https://microexplorer.scryptachain.org/transactions/' + payload[0])
      let balance = await axios.get('https://microexplorer.scryptachain.org/balance/' + payload[0])
      let address = {
        address: payload[0],
        balance: balance.data.balance.toFixed(4),
        transactions: transactions.data.data,
        index: i
      }
      app.accounts.push(address)
    }

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
    this._location.back()
  }

  addAccount() {
    const app = this
    app.router.navigate(['/login-to-wallet/add'])
  }

  async fetchTransactions() {
    const app = this
    axios.get('https://microexplorer.scryptachain.org/transactions/' + app.address)
      .then(function (response) {
        app.transactions = response.data['data']
      })
  }

  async openDetails(index) {
    const modal = await this.modalCtrl.create({
      component: AccountDetailPage,
      componentProps: {
        index: index
      }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      
    })
    await modal.present()
  }

}
