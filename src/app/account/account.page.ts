import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { ToastController, ModalController } from '@ionic/angular';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';
import { OverlayEventDetail } from '@ionic/core';
import { AccountTransactionsDetailPage } from '../account-transactions-detail/account-transactions-detail.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  balance: string = '-'
  wallet: ''
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
  }

  copyAddress() {
    this.clipboard.copy(this.address)
    alert('Address copied!')
  }

  async fetchTransactions() {
    const app = this
    axios.get('https://microexplorer.scryptachain.org/transactions/' + app.address)
      .then(function (response) {
        app.transactions = response.data['data']
      })
  }

  async openDetails(response) {
    console.log(response)
    const modal = await this.modalCtrl.create({
      component: AccountTransactionsDetailPage,
      componentProps: {
        response: response
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
