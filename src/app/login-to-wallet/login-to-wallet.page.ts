import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {Platform} from '@ionic/angular'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-login-to-wallet',
  templateUrl: './login-to-wallet.page.html',
  styleUrls: ['./login-to-wallet.page.scss'],
})
export class LoginToWalletPage implements OnInit {

  constructor(private nfc:NFC,private ndef:Ndef,private qrScanner: QRScanner, public platform:Platform,private androidPermissions:AndroidPermissions) { }

  ngOnInit() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.NFC).then(
      result=>alert('Permessi? '+ result.hasPermission),
      err=>this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.NFC)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.NFC]);
  }



  loginCard()
  {
    var nfcreader;
    this.platform.ready().then(()=>{
     nfcreader=this.nfc.addNdefListener(()=>{
      alert('successfull attached ndef');
    },(err)=>{
      alert('errore ndef');

    }).subscribe((event)=>{
      alert(this.nfc.bytesToString(event.tag.ndefMessage[0].payload).substr(3));

      console.log(this.nfc.bytesToString(event.tag.ndefMessage[0].payload).substr(3));
    });
      let message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then().catch();
    })
    nfcreader.unsubscribe();

  }

  readQrCode()
  {
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         alert('Scanned something'+ text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => alert('Error is'+ e));
  }

}
