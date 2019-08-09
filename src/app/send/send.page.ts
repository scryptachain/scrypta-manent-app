import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../windowservice';
import axios from 'axios'
import { checkNoChanges } from '@angular/core/src/render3/instructions';
import { unwatchFile } from 'fs';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx'
import { Router } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  
  
  private _window: ICustomWindow;

  nodes:string[]=[];
  connected:string='';
  public_address:string;
  encrypted_wallet:string;
  amountToSend: number;
  addressToSend: string;
  unlockPwd: string;
  decrypted_wallet: string;
  private_key: any;
  api_secret: any;
  isSending: boolean;
  messageToSend: any;
  balance: any;
  @ViewChild('passwordSend') mypassword;
  constructor(windowRef: WindowRefService,private qrScanner: BarcodeScanner,private router:Router) { 
    this._window = windowRef.nativeWindow;
    
    
  }

  ngOnInit() {
    document.getElementById('password').style.display='none'
    document.getElementById('buttonSend').style.display='none'
    var bal=JSON.parse(localStorage.getItem('balance'));
    this.balance=bal.data
    
    this.checkIdaNodes();
    this.checkUser();

  }


  checkIdaNodes()
  {
    var checknodes=this._window.ScryptaCore.returnNodes();
    const app=this
    for(var i=0;i<checknodes.length;i++)
    {
      axios.get('https://'+checknodes[i]+'/check').then(function(response){
      app.nodes.push(response.data.name)
      if(i==checknodes.length)
      {
        app.connectToNode()
      }
      })
    }

   

  }
  connectToNode()
  {
    var app=this
    if(app.connected==''){
      app.connected=app.nodes[Math.floor(Math.random()*app.nodes.length)]
    }
  }

  checkUser()
  {
    
     var address=localStorage.getItem('lyraWallet').split(':');
     console.log(address)
     
    this.public_address=address[0]
    this.encrypted_wallet=address[1]
    console.log(this.encrypted_wallet);
    console.log(this.public_address)
    }
 /* 
 openUnlockWallet()
 {
   if(this.addressToSend !=='' &&  this.amountToSend > 0){
     document.getElementById('password').style.display='block'
   }
 }
 */

 unlockWallet()
 {
   if(this.unlockPwd !==''){
    var unlockPasswd=localStorage.getItem('lyraWallet');
     console.log(this.unlockPwd)
     var app=this
     app.decrypted_wallet='Wallet Locked'
     app._window.ScryptaCore.readKey(this.unlockPwd,unlockPasswd).then(function(response){
       if(response !== false)
       {
         app.private_key=response.key
         app.api_secret=response.api_secret
         app.sendLyra();
       }else{
         alert('Wrong Password')
       }
     })
   }else{
     alert('Write your password first')
   }
 }

 async sendLyra()
 {
  var unlockPasswd=localStorage.getItem('lyraWallet');
  console.log(unlockPasswd)
  await this._window.ScryptaCore.send(this.unlockPwd,'',this.addressToSend,this.amountToSend,'','',unlockPasswd).then((result) => {
   //alert('Successfull!!\n Your txid is :'+result)
   this.router.navigate(['/successfulsend'])
   
  }).catch((err) => {
    console.log(err)
  }); 
    
  
   /*
   const app=this
  
       app.isSending=true
       axios.post('https://'+app.connected+'/send',{
         from:app.public_address,
         to:app.addressToSend,
         private_key:app.private_key,
         message:app.messageToSend
       }).then(function(response){
         console.log(response)
         if(response.data.data.success==true){
         alert('Funds sent correctly,here the txid'+response.data.data.txid);
         app.addressToSend='';
         app.amountToSend=0;
         app.messageToSend='';
         app.private_key='';
         app.unlockPwd='';
         app.isSending=false
         }else{
           console.log(response)
          alert('Something goes wrong: ' + response.data.data.walletresponse.error);
         }
       })
     
   */
 }
scanQRCode()
{
  this.qrScanner.scan().then(barcodeData=>{
    console.log('barcode',barcodeData)
    this.addressToSend=barcodeData.text
    document.getElementById('password').style.display='block';
    document.getElementById('buttonSend').style.display='block';
    this.mypassword.setFocus()

  }).catch(err=>{
    console.log(err)
  })

}
unlockButton()
{
  document.getElementById('buttonSend').style.display='block'
}



}
