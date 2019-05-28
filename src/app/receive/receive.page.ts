import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

declare var QRious:any
@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
 pubaddress:string
 amount:any
 encodedData:{}
 public myAngularxQrCode: string = null;


  constructor(private barcode:BarcodeScanner) { 
    this.myAngularxQrCode = 'Your QR code data string';
    this.amount=0
  }

  ngOnInit() {
    this.fetchAddress();
    console.log(this.pubaddress)
    this.fetchQRCode()
  }

 async fetchAddress(){
   var indirizzo=localStorage.getItem('createPasswd').split(':');
   this.pubaddress=indirizzo[0];
 }

  fetchQRCode(valore=null)
{
  if(this.amount==0)
  {
    this.myAngularxQrCode='lyra:'+this.pubaddress
    
    
  }
  else if(this.amount!=0)
  { 
    console.log(valore)
    this.myAngularxQrCode='lyra'+this.pubaddress+"?"+"amount:"+this.amount
    console.log(this.myAngularxQrCode)
  }

}
}
