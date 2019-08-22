import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

declare var QRious: any
@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  amount: any
  encrypted: string = ''
  wallet: string = ''
  selected: number = 0
  address: string
  encodedData: {}
  public myAngularxQrCode: string = null;


  constructor(private barcode: BarcodeScanner) {
    this.myAngularxQrCode = 'Your QR code data string';
    this.amount = 0
  }

  ngOnInit() {
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    this.fetchQRCode()
  }
  fetchQRCode(valore = null) {
    if (this.amount == 0) {
      this.myAngularxQrCode = 'lyra:' + this.address


    } else if (this.amount != 0) {
      this.myAngularxQrCode = 'lyra' + this.address + "?" + "amount:" + this.amount
    }

  }
}
