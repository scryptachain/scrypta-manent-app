import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
import { Clipboard } from '@ionic-native/clipboard/ngx'

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})

export class AccountDetailPage implements OnInit {
  @Input() response: any
  index
  wallet: any
  address: any = ''
  public myAngularxQrCode: string = null;
  encrypted: any
  balance: any = 0
  transactions: any = []
  constructor(private clipboard: Clipboard, private modalCtrl: ModalController) {
    
  }

  ngOnInit() {
    const app = this
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.index].split(':')
    app.address = payload[0]
    app.myAngularxQrCode = app.address
    app.encrypted = payload[1]
    axios.get('https://microexplorer.scryptachain.org/transactions/' + app.address).then(response => {
      app.transactions = response.data.data
    })
    axios.get('https://microexplorer.scryptachain.org/balance/' + app.address).then(response => {
      app.balance = response.data.balance
    })
  }

  close() {
    this.modalCtrl.dismiss()
  }



  copyAddress() {
    const app = this
    app.clipboard.copy(app.address)
    alert('Address copied!')
  }


  openInExplorer() {
    const app = this
    window.open('https://explorer.scryptachain.org/address/' + app.address, '_system', 'location=yes'); return false;
  }

}
