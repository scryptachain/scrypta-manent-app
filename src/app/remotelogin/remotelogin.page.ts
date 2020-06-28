import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { WindowRefService, ICustomWindow } from '../windowservice';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
var locales =  require('../locales.js')
import { SocketOne, SocketTwo, SocketThree, SocketFour, SocketFive, SocketSix } from '../app.module';

@Component({
  selector: 'app-remotelogin',
  templateUrl: './remotelogin.page.html',
  styleUrls: ['./remotelogin.page.scss'],
})

export class RemoteloginPage implements OnInit {
  locales: any = locales
  language: string = 'en'
  wallet: ''
  isSending: boolean = false
  encrypted: string = ''
  selected: number = 0
  address: string
  private _window: ICustomWindow
  translations: any = {}
  unlockPwd: string;
  scrypta: any = {}
  global: any = {}
  constructor(private router: Router, windowRef: WindowRefService, private socketone: SocketOne, private sockettwo: SocketTwo, private socketthree: SocketThree, private socketfour: SocketFour, private socketfive: SocketFive, private socketsix: SocketSix, private qrScanner: BarcodeScanner) {
    const app = this
    app._window = windowRef.nativeWindow;
    this.socketone.connect()
    this.sockettwo.connect()
    this.socketthree.connect()
    this.socketfour.connect()
    this.socketfive.connect()
    this.socketsix.connect()
  }

  goBack() {
    const app = this
    app.router.navigate(['/dashboard'])
  }

  ngOnInit() {
    const app = this
    if (localStorage.getItem('language') !== null) {
      app.language = localStorage.getItem('language')
    }
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.translations = this.locales.default[app.language]
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
  }

  scanQRCode() {
    const app = this
    if(app.unlockPwd !== ''){
      app._window.ScryptaCore.readKey(app.unlockPwd, app.address + ':' + app.encrypted).then(async function (check) {
        if(check !== false){
            app.isSending = true
              app.qrScanner.scan().then(barcodeData => {
              var address = barcodeData.text.replace('login:','')
              app._window.ScryptaCore.readKey(app.unlockPwd, app.address + ':' + app.encrypted).then(async function (response) {
                let tosign = JSON.stringify({
                    protocol: 'login://',
                    request: address,
                    sid: app.address + ':' + app.encrypted,
                    timestamp: new Date().getTime()
                })
                let message = await app._window.ScryptaCore.signMessage(response.prv, tosign)
                app.socketone.emit('message', message);
                app.sockettwo.emit('message', message);
                app.sockettwo.emit('message', message);
                app.sockettwo.emit('message', message);
                app.sockettwo.emit('message', message);
                app.sockettwo.emit('message', message);
              })
              setInterval(function(){
                app._window.ScryptaCore.readKey(app.unlockPwd, app.address + ':' + app.encrypted).then(async function (response) {
                let tosign = JSON.stringify({
                    protocol: 'login://',
                    request: address,
                    sid: app.address + ':' + app.encrypted,
                    timestamp: new Date().getTime()
                })
                let message = await app._window.ScryptaCore.signMessage(response.prv, tosign)
                app.socketone.emit('message', message);
                app.sockettwo.emit('message', message);
                app.sockettwo.emit('message', message);
                app.sockettwo.emit('message', message);
                app.sockettwo.emit('message', message);
                app.sockettwo.emit('message', message);
              }, 2000)
            })
          }).catch(err => {
            console.log(err)
          })
        }else{
          alert('Wrong password!')
        }
      })
    }
  }
}
