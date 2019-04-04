import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file/';
import {File} from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';

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
  constructor(private transfer:FileTransfer, private file:File,public router:Router,fileTransfer:FileTransfer,private diagnostic:Diagnostic) { }
  
  
  ngOnInit() {
    
    var credentials=localStorage.getItem('credential');
    console.log(credentials)
    var credJson=JSON.parse(credentials)
    this.public_address=credJson.pub;
    var files=new Blob([credJson.walletstore],{type:'sid'});
    this.filedownload=files;
    var buttonid=document.getElementById('downloadsid');
    this.a=buttonid;
    
    
  }


  downloadFile()
  {
   // console.log(this.public_address)
    //this.a.href=URL.createObjectURL(this.file);
    //this.a.download=this.public_address+'.sid';
    
    const fileTransfer:FileTransferObject=this.transfer.create();
    console.log(fileTransfer);
    this.file.writeFile(this.file.externalDataDirectory,this.public_address+'.sid',this.filedownload)
    console.log(this.file.externalDataDirectory)
    alert('File .sid salvato con Successo!')
    /*
    fileTransfer.download(url, this.file.applicationStorageDirectory +'/Download/'+ this.public_address+'.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
     console.log('ccccc',error)
    })
  */
  }


  goNext()
  {
    this.router.navigate(['/login-to-wallet'])
  }
  goPrev()
  {
    history.go(-1);
  }

}
