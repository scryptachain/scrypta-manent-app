import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
import { WindowRefService, ICustomWindow } from '../windowservice';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { OverlayEventDetail } from '@ionic/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})

export class AccountDetailPage implements OnInit {
  @Input() response: any
  index
  private _window: ICustomWindow;
  wallet: any
  address: any = ''
  public myAngularxQrCode: string = null;
  encrypted: any
  balance: any = 0
  transactions: any = []
  password: any = ''
  private_key: any = ''
  showUnlock:boolean = false
  constructor(private clipboard: Clipboard, windowRef: WindowRefService, private modalCtrl: ModalController, private iab: InAppBrowser) {
    this._window = windowRef.nativeWindow;
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
      app.balance = response.data.balance.toFixed(4)
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

  useAddress(){
    const app = this
    localStorage.setItem('selected', app.index)
    alert('Address selected!')
  }

  copyPrivKey() {
    const app = this
    app.clipboard.copy(app.private_key)
    alert('Private key copied!')
  }

  unlock(){
    const app = this
    app.showUnlock = true
  }

  lock(){
    const app = this
    app.showUnlock = false
  }

  unlockWallet() {
    const app = this
    if (app.password !== '') {
      app._window.ScryptaCore.readKey(app.password, app.address + ':' + app.encrypted).then(function (response) {
        if (response !== false) {
          app.lock()
          app.private_key = response.prv
          app.password = ''
        } else {
          alert('Wrong Password')
        }
      })
    } else {
      alert('Fill all the fields!')
    }
  }

  openInExplorer() {
    const app = this
    this.iab.create('https://explorer.scryptachain.org/address/' + app.address, '_system', 'location=yes'); return false;
  }

  openDetails(response) {
    this.iab.create('https://explorer.scryptachain.org/transaction/' + response.txid, '_system', 'location=yes')
  }

}
