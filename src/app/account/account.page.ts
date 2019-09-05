import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { ToastController, ModalController } from '@ionic/angular';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';
import { OverlayEventDetail } from '@ionic/core';
import { AccountDetailPage } from '../account-detail/account-detail.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {
  balance: string = '-'
  wallet: ''
  accounts = []
  encrypted: string = ''
  selected: number = 0
  address: string
  transactions = []
  constructor(private clipboard: Clipboard, private toast: ToastController, private modalCtrl: ModalController) { }

  ngOnInit() {
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    app.parseWallet()
  }
  
  async parseWallet() {
    const app = this
    for (let i = 0; i < app.wallet.length; i++) {
      let transactions = await axios.get('https://microexplorer.scryptachain.org/transactions/' + app.address)
      let balance = await axios.get('https://microexplorer.scryptachain.org/balance/' + app.address)
      let payload = app.wallet[i].split(':')
      let address = {
        address: payload[0],
        balance: balance.data.balance,
        transactions: transactions.data.data,
        index: i
      }
      app.accounts.push(address)
    }

  }

  addAccount() {
    //TODO: ADD MORE ACCOUNTS
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
      if (detail != null) {
        console.log(detail);

      }
    })
    await modal.present()
  }

}
