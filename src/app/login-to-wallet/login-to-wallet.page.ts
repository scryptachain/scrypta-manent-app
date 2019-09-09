import { Component, OnInit, ViewChild } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform, ModalController, LoadingController } from '@ionic/angular'
import { WindowRefService, ICustomWindow } from '../windowservice';
import { Router } from '@angular/router';
import Axios from 'axios';
//import {createCipher,createDecipher} from 'crypto';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx'
import { HTTP } from '@ionic-native/http/ngx'
import { ModalLoginPage } from '../modal-login/modal-login.page';
import { OverlayEventDetail } from '@ionic/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-to-wallet',
  templateUrl: './login-to-wallet.page.html',
  styleUrls: ['./login-to-wallet.page.scss'],
})
export class LoginToWalletPage implements OnInit {
  add: string = ''
  password: string = '';
  decrypted_wallet: string = '';
  nodes: string[] = [];
  connected: string = '';
  private _window: ICustomWindow;
  showNFC:boolean = false
  nfcreader:any

  constructor(private nfc: NFC, private ndef: Ndef, private qrScanner: BarcodeScanner, public platform: Platform, windowRef: WindowRefService, public router: Router, private fileChooser: FileChooser, private fileOpener: FileOpener, private filePath: FilePath, private file: File, private http: HTTP, private modalCtrl: ModalController, private loadingController: LoadingController,
    public activatedRoute: ActivatedRoute, private _location: Location) {
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.add = this.activatedRoute.snapshot.paramMap.get('add')
  }

  goBack() {
    this._location.back()
  }

  loginCard() {
    const app = this
    this.platform.ready().then(() => {
      app.nfcreader = this.nfc.addNdefListener(() => {
        app.showNFC = true
      }, (err) => {
        alert('NFC is not enabled or device not compatible.');
      }).subscribe(async (event) => {
        app.showNFC = false
        let NFC = this.nfc.bytesToHexString(event.tag.ndefMessage[0].payload)
        var hex  = NFC.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        let address = str.substr(3)
        app.addAddress(address)
        app.nfcreader.unsubscribe()
        if(this.add !== null){
          this.router.navigate(['/account'])
        }else{
          this.router.navigate(['/dashboard'])
        }
      });

    })
  }

  closeNFC(){
    const app = this
    app.nfcreader.unsubscribe()
    app.showNFC = false
  }

  createNewAddress() {
    const app = this
    app.router.navigate(['/home/add'])
  }

  addAddress(address){
    let payload = address.split(':')
    if(payload[0] !== undefined && payload[1] !== undefined){
      if(payload[0].length === 34){
        if(localStorage.getItem('wallet') === null){
          let wallet = [address]
          localStorage.setItem('wallet',JSON.stringify(wallet))
        }else{
          let wallet = JSON.parse(localStorage.getItem('wallet'))
          if(wallet.indexOf(address) === -1){
            wallet.push(address)
            localStorage.setItem('wallet',JSON.stringify(wallet))
            alert('Address ' + payload[0] + ' imported!')
          }else{
            alert('This address exist yet!')
          }
        }
      }else{
        alert('This isn\'t a backup payload!')
      }
    }else{
      alert('This isn\'t a backup payload!')
    }
  }

  async loading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      duration: 3500,
      message: 'Please Wait...',
      translucent: true,
    })
    await loading.present();
  }

  async readQrCode() {
    await this.qrScanner.scan().then(async barcodeData => {
      this.addAddress(barcodeData.text)
      if(this.add !== null){
        this.router.navigate(['/account'])
      }else{
        this.router.navigate(['/dashboard'])
      }
    }).catch(err => {
      console.log(err)
    })
  }

  async openSidFile() {
    this.fileChooser.open().then(uploadfile => {
      console.log(uploadfile)
      this.filePath.resolveNativePath(uploadfile).then(resolvedFilePath => {
        console.log(resolvedFilePath);
        this.file.resolveLocalFilesystemUrl(resolvedFilePath).then(fileinfo => {
          console.log(fileinfo)
          this.file.readAsText(this.file.externalRootDirectory + '/Download/', fileinfo.name).then(async result => {
            this.addAddress(result)
            if(this.add !== null){
              this.router.navigate(['/account'])
            }else{
              this.router.navigate(['/dashboard'])
            }
          })
        })
      })
    })
  }
}
