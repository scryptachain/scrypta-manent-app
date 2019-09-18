import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { WindowRefService, ICustomWindow } from '../windowservice';
import Axios from 'axios';

@Component({
  selector: 'app-archivedetail',
  templateUrl: './archivedetail.page.html',
  styleUrls: ['./archivedetail.page.scss'],
})
export class ArchivedetailPage implements OnInit {
  @Input() response:any
  risposta
  private _window: ICustomWindow;
  wallet: any
  connected: any = 'https://idanodejs01.scryptachain.org'
  address: any = ''
  encrypted: any
  selected: number = 0
  password: string = ''
  isInvalidating: boolean = false
  showInvalidate: boolean = false
  constructor(private modalCtrl:ModalController, private iab: InAppBrowser, windowRef: WindowRefService) {
    this._window = windowRef.nativeWindow;
   }

  ngOnInit() {
    this.risposta=this.response
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
  }
  
  openFile(response) {
    this.iab.create(this.connected + '/ipfs/' + response, '_system', 'location=yes');
  }
  openPoE(uuid) {
    this.iab.create('https://proof.scryptachain.org/#/uuid/' + uuid, '_system', 'location=yes');
  }
  closemodal(){
    this.modalCtrl.dismiss()
  }
  showInvalidateModal(){
    this.showInvalidate = true
    this.password = ''
  }
  hideInvalidateModal(){
    this.showInvalidate = false
    this.password = ''
  }
  unlockWallet() {
    const app = this
    if (app.password !== '') {
      app._window.ScryptaCore.readKey(app.password, app.address + ':' + app.encrypted).then(function (response) {
        if (response !== false) {
          app.isInvalidating = true
          let prv = response.prv
          app.password = ''
          Axios.post(app.connected + '/invalidate',{
            private_key: prv,
            uuid: app.risposta.uuid,
            dapp_address: app.address
          }).then(result => {
            if(result.data !== undefined && result.data.success === true){
              app.isInvalidating = false
              app.hideInvalidateModal()
              app.closemodal()
              alert('Data invalidated correctly, wait at least 2 minutes before see again your Vault.')
            }else{
              alert('Something goes wrong, please retry')
            }
          }).catch(err => {
            alert('Something goes wrong, please retry')
            app.isInvalidating = false
          })
        } else {
          alert('Wrong Password')
        }
      })
    } else {
      alert('Fill all the fields!')
    }
  }
}
