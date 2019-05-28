import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file/';
import {File} from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import Axios from 'axios';
import { WindowRefService, ICustomWindow } from '../windowservice';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.page.html',
  styleUrls: ['./congratulations.page.scss'],
})
export class CongratulationsPage implements OnInit {
  
  storageDirectory:string='';
  filedownload:any;
  a:any;
  public_address:string;
  nodes:string[]=[];
  connected:string='';
  private _window: ICustomWindow;
  decrypted_wallet: string;
  constructor(private transfer:FileTransfer, private file:File,public router:Router,fileTransfer:FileTransfer,private diagnostic:Diagnostic,windowRef: WindowRefService,private permission:AndroidPermissions) { 
    this._window = windowRef.nativeWindow;
  }
  
  
  ngOnInit() {
    
    var credentials=localStorage.getItem('credential');
    console.log(credentials)
    var credJson=JSON.parse(credentials)
    localStorage.setItem('createPasswd',credJson.walletstore)
    this.public_address=credJson.pub;
    var files=new Blob([credJson.walletstore],{type:'sid'});
    this.filedownload=files;
    var buttonid=document.getElementById('downloadsid');
    this.a=buttonid;
    this.checkIdaNodes();
   
  }

  getPermissions()
  {
    this.permission.hasPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE).then(status=>{
      if(status.hasPermission){
        this.downloadFile()
      }
      else{
        this.permission.requestPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE).then(status =>{
          if(status.hasPermission)
          {
            this.downloadFile()
          }
        })
      }
    })
  }

  async downloadFile()
  {
   // console.log(this.public_address)
    //this.a.href=URL.createObjectURL(this.file);
    //this.a.download=this.public_address+'.sid';
    
    const fileTransfer:FileTransferObject=this.transfer.create();
    console.log(fileTransfer);
    this.file.writeFile(this.file.externalRootDirectory+'/Download/',this.public_address+'.sid',this.filedownload)
    console.log(this.file.externalDataDirectory)
    alert('File .sid salvato con Successo!')
    /*
    fileTransfer.download(url, this.file.applicationStorageDirectory +'/Download/'+ this.public_address+'.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
     console.log('ccccc',error)
    })
  */
 await this.unlockWallet();
  }


  async goNext()
  {
    await this.unlockWallet();
    
  }
  goPrev()
  {
    history.go(-1);
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
    console.log(app.connected)
    this.checkBalance();
    this.fetchTransactions();
}
}

async unlockWallet()
{
  var password=localStorage.getItem('password')
  console.log(password)
  //console.log(localStorage.getItem('createPasswd'));
  var unlockPasswd=localStorage.getItem('createPasswd');
  
  var decrypted_wallet=this.decrypted_wallet
  localStorage.setItem('decrypted_wallet',decrypted_wallet);
  //var password=this.password;
      decrypted_wallet='WALLET LOCKED';
      //console.log(unlockPasswd);
      //var split=unlockPasswd.split(':');
      //console.log(split)
      
       await this._window.ScryptaCore.readKey(password,unlockPasswd).then( function(response){

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
      //this.fetchTransactions();
       this.checkBalance();
       this.router.navigate(['/dashboard'])

}
  checkBalance()
{
  //console.log('balanceApp',this.connected)
  var app=this
  console.log('balanceApp',app.connected)
  var createPasswd=localStorage.getItem('createPasswd');
  var indirizzo=createPasswd.split(':');
  Axios.post('https://'+app.connected+'/getbalance',{
    address:indirizzo[0]
  }).then(function(response){
    console.log(response)
    localStorage.setItem('balance',JSON.stringify(response.data))
    
  })


  
}

fetchTransactions()
{
var app=this
var createPasswd=localStorage.getItem('createPasswd');
var indirizzo=createPasswd.split(':');
Axios.post('https://'+app.connected+'/transactions',{
  address:indirizzo[0]
}).then(function(response){
  console.log('transactions',response)
  localStorage.setItem('transactions',response.request.response)
}) 



}


}
