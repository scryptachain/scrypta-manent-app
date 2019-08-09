import { Component, OnInit, ViewChild } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {Platform, ModalController, LoadingController} from '@ionic/angular'
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
import { ModalLoginPage } from '../modal-login/modal-login.page';
import { OverlayEventDetail } from '@ionic/core';
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
  


  constructor(private nfc:NFC,private ndef:Ndef,private qrScanner: BarcodeScanner, public platform:Platform, windowRef: WindowRefService,public router:Router, private fileChooser:FileChooser,private fileOpener:FileOpener,private filePath:FilePath,private file:File,private http:HTTP,private modalCtrl:ModalController,private loadingController:LoadingController)
  { 
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
    localStorage.removeItem('transactions')
    localStorage.removeItem('transactions2')
     this.checkIdaNodes();
     
    
    if(localStorage.getItem('lyraWallet')!=null){
      this.openModal()
    }
    
    
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
      alert('Avvicina la tua card al sensore NFC');
    },(err)=>{
      alert('errore ndef');

    }).subscribe(async (event)=>{

      alert('Inserisci la password ed entra nel tuo wallet');
      console.log('precedente',localStorage.getItem('lyraWallet'))
      await localStorage.removeItem('lyraWallet')
      
      await localStorage.setItem('lyraWallet',this.nfc.bytesToString(event.tag.ndefMessage[0].payload).substr(3));
      console.log(localStorage.getItem('lyraWallet'))
      
      nfcreader.unsubscribe();
      
      this.openModal().then((result)=>{
        console.log(result)
      }).catch((err)=>{
        console.log(err)
      })
     
    });

    
      let message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then().catch();
      
    })

  

  }


  async openModal()
  {
    const modal= await this.modalCtrl.create({
      component:ModalLoginPage
    });
    
    modal.onDidDismiss().then((detail:OverlayEventDetail)=>{
      if(detail!=null)
      {
        console.log(detail);
        this.password=detail.data;
        this.unlockWallet()
        
      }
    })
    await modal.present()
    
  }


 async unlockWallet()
{
  await this.checkBalance();
  //await this.fetchTransactions();
  var unlockPasswd=localStorage.getItem('lyraWallet');
  
  var decrypted_wallet=this.decrypted_wallet
  localStorage.setItem('decrypted_wallet',decrypted_wallet);
 
      decrypted_wallet='WALLET LOCKED';
     
      
       await this._window.ScryptaCore.readKey(this.password,unlockPasswd).then( function(response){

      
        if(response!==false)
        {
          
          decrypted_wallet=response.prv
          console.log(decrypted_wallet);
          
          
        }else{
          alert('Wrong Password')
          location.reload(); 
        }
      })
     // await this.loading()

      


}
   async checkBalance()
{
  
  var app=this
  var lyraWallet=localStorage.getItem('lyraWallet');
  var indirizzo=lyraWallet.split(':');
  Axios.post('https://'+app.connected+'/getbalance',{
    address:indirizzo[0]
    
  }).then(async function(response){
    console.log(response)
    await app.loading()
    localStorage.setItem('balance',JSON.stringify(response.data))
   // localStorage.removeItem('transactions')
    //localStorage.removeItem('transactions2')
   await app.fetchTransactions();
    
    app.router.navigate(['/dashboard'])
  })


  
}
 async loading()
{
  const loading= await this.loadingController.create({
    spinner:'circles',
    duration:3500,
    message:'Please Wait...',
    translucent:true,
  })
  await loading.present();
  
}

async fetchTransactions()
{
var app=this
var lyraWallet=localStorage.getItem('lyraWallet');
var indirizzo=lyraWallet.split(':');
await Axios.post('https://'+app.connected+'/transactions',{
  address:indirizzo[0]
}).then(async function(response){
  //console.log('trans-pre',localStorage.getItem('transactions'))
  //await localStorage.removeItem('transactions')
  await localStorage.setItem('transactions2',response.request.response)
  console.log('dopo-',localStorage.getItem('transactions2'))
}) 



}

async readQrCode()
{
 await this.qrScanner.scan().then(async barcodeData=>{
    await localStorage.removeItem('lyraWallet')
    await localStorage.setItem('lyraWallet',barcodeData.text);
    
   this.openModal()
  }).catch(err=>{
    console.log(err)
  })
}

async openSidFile()
{
  
  this.fileChooser.open().then(uploadfile=>{
    console.log(uploadfile)
    this.filePath.resolveNativePath(uploadfile).then(resolvedFilePath=>{
      console.log(resolvedFilePath);
      this.file.resolveLocalFilesystemUrl(resolvedFilePath).then(fileinfo=>{
        console.log(fileinfo)
        this.file.readAsText(this.file.externalRootDirectory+'/Download/',fileinfo.name).then(async result=>{
          
          await localStorage.removeItem('lyraWallet')
          await localStorage.setItem('lyraWallet',result);
         
         this.openModal()
        })
      })
      
       
    })
   
  })
    

}
}
