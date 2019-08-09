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
    
    //this.public_address=credJson.pub;
    let walletstore = localStorage.getItem('wallet')
    var files=new Blob([walletstore],{type:'sid'});
    this.filedownload=files;
    var buttonid=document.getElementById('downloadsid');
    this.a=buttonid;
   
  }
  
  getPermissions()
  {
    const app = this
    
    app.permission.hasPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE).then(status=>{
      if(status.hasPermission){
        this.downloadFile()
      }else{
        app.permission.requestPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE).then(status =>{
          if(status.hasPermission)
          {
            this.downloadFile()
          }
        })
      }
    }).catch(error => {
      alert('Can\'t save .sid file, skipping now.')
      app.router.navigate(['/dashboard'])
    })
  }

  async downloadFile()
  {
   // console.log(this.public_address)
    //this.a.href=URL.createObjectURL(this.file);
    //this.a.download=this.public_address+'.sid';
    const app = this
    const fileTransfer:FileTransferObject=this.transfer.create();
    let timestamp = new Date().getTime()
    this.file.writeFile(this.file.externalRootDirectory+'/Download/','walletbak_'+timestamp+'.sid',this.filedownload)
    //console.log(this.file.externalDataDirectory)
    alert('Backup stored successfully!')
    app.router.navigate(['/dashboard'])
  }


  async goNext()
  {
    const app = this
    app.router.navigate(['/congratulations'])
  }
  goPrev()
  {
    history.go(-1);
  }

}
