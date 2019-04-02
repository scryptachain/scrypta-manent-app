import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file/';
import {File} from '@ionic-native/file/ngx'
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.page.html',
  styleUrls: ['./congratulations.page.scss'],
})
export class CongratulationsPage implements OnInit {
  file:any;
  a:any;
  public_address:string;
  constructor(private transfer:FileTransfer, private fileT:File,public router:Router) { }
  fileTransfer: FileTransferObject = this.transfer.create();
  ngOnInit() {
    var credentials=localStorage.getItem('credential');
    var credJson=JSON.parse(credentials)
    this.public_address=credJson.pub;
    var files=new Blob([credJson.pub+':'+credJson.enc],{type:'sid'});
    this.file=files;
    var buttonid=document.getElementById('downloadsid');
    this.a=buttonid;

  }


  downloadFile()
  {
    console.log(this.public_address)
    this.a.href=URL.createObjectURL(this.file);
    //this.a.download=this.public_address+'.sid';
    const url = 'http://www.example.com/file.pdf';
   this.fileTransfer.download(url, this.fileT.dataDirectory + 'file.pdf').then((entry) => {
    console.log('download complete: ' + entry.toURL());
  }, (error) => {
    // handle error
  });
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
