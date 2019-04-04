import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {Platform} from '@ionic/angular'
import { WindowRefService, ICustomWindow } from '../windowservice';
import { Router } from '@angular/router';
import Axios from 'axios';
//import {createCipher,createDecipher} from 'crypto';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx'
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {File} from '@ionic-native/file/ngx'
import {HTTP} from '@ionic-native/http/ngx'
@Component({
  selector: 'app-login-to-wallet',
  templateUrl: './login-to-wallet.page.html',
  styleUrls: ['./login-to-wallet.page.scss'],
})
export class LoginToWalletPage implements OnInit {
  
  password:string='';
  decrypted_wallet:string='';
  nodes:string[]=[];
  connected:string='';
  private _window: ICustomWindow;

  constructor(private nfc:NFC,private ndef:Ndef,private qrScanner: BarcodeScanner, public platform:Platform, windowRef: WindowRefService,public router:Router, private fileChooser:FileChooser,private fileOpener:FileOpener,private filePath:FilePath,private file:File,private http:HTTP)
  { 
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
     this.checkIdaNodes();
    document.getElementById('password').style.display='none';
    
    
    
  }

    checkIdaNodes()
  {
    var checknodes=  this._window.ScryptaCore.returnNodes();
    const app=this
    for(var i=0; i<checknodes.length;i++)
    {
      Axios.get('https://'+checknodes[i]+'/check').then(function(response)
      {
        app.nodes.push(response.data.name)
        if(i==checknodes.length)
        {
          //console.log('stop');
          app.connectToNode();
        }
      })
    }
  }
connectToNode()
{
  console.log(this.nodes);
  var app = this
  if(app.connected == ''){
    app.connected = app.nodes[Math.floor(Math.random()*app.nodes.length)];
}
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
      alert('Inserisci la password ed entra nel tuo wallet');

      //console.log(this.nfc.bytesToString(event.tag.ndefMessage[0].payload).substr(3));
      localStorage.setItem('createPasswd',this.nfc.bytesToString(event.tag.ndefMessage[0].payload).substr(3));
      document.getElementById('password').style.display='block';

      //this.unlockWallet();

    });
      let message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then().catch();
      
    })
   

  }



 async unlockWallet()
{
  console.log(this.password)
  //console.log(localStorage.getItem('createPasswd'));
  var unlockPasswd=localStorage.getItem('createPasswd');
  
  var decrypted_wallet=this.decrypted_wallet
  localStorage.setItem('decrypted_wallet',decrypted_wallet);
  //var password=this.password;
      decrypted_wallet='WALLET LOCKED';
      //console.log(unlockPasswd);
      //var split=unlockPasswd.split(':');
      //console.log(split)
      
       await this._window.ScryptaCore.readKey(this.password,unlockPasswd).then( function(response){

       console.log(response+'pre');
        if(response!==false)
        {
          
          decrypted_wallet=response.prv
          console.log(decrypted_wallet);
          
          
        }else{
          alert('Wrong Password')
          location.reload(); 
        }
      })

       this.checkBalance();


}
  checkBalance()
{
  
  var app=this
  var createPasswd=localStorage.getItem('createPasswd');
  var indirizzo=createPasswd.split(':');
  Axios.post('https://'+app.connected+'/getbalance',{
    address:indirizzo[0]
  }).then(function(response){
    console.log(response)
    localStorage.setItem('balance',JSON.stringify(response.data))
    app.router.navigate(['/dashboard'])
  })


  
}
/*
  readQrCode()
  {
    console.log('ci sono entrato')
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted
      this.qrScanner.show();

       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', scanSub);
         alert(text)

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       console.log('non abilitato'+status);
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }
*/
readQrCode()
{
  this.qrScanner.scan().then(barcodeData=>{
    console.log('barcode',barcodeData)
    localStorage.setItem('createPasswd',barcodeData.text);
    document.getElementById('password').style.display='block';
  }).catch(err=>{
    console.log(err)
  })
}

openSidFile()
{
  
  this.fileChooser.open().then(uploadfile=>{
    console.log(uploadfile)
    this.filePath.resolveNativePath(uploadfile).then(resolvedFilePath=>{
      console.log(resolvedFilePath);
      this.file.resolveLocalFilesystemUrl(resolvedFilePath).then(fileinfo=>{
        console.log(fileinfo)
        this.file.readAsText(this.file.externalDataDirectory,fileinfo.name).then(result=>{
          //console.log(result);
          localStorage.setItem('createPasswd',result);
    document.getElementById('password').style.display='block';
        })
      })
      /*
      var namefile=resolvedFilePath.split('/');
      console.log(namefile)
     this.file.readAsText(this.file.externalDataDirectory,namefile[10]).then(ffff=>{
       console.log(ffff)
     })*/
       
    })
    /*
    
    this.fileOpener.open(uploadfile,'txt').then(fileopen=>{
      console.log('fileopen') 
    }).catch(err=>{
      console.log('err'+err)
    })
  
*/
  })
    

}
}
