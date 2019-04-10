import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file/';
import {File} from '@ionic-native/file/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx'
import * as jsPdf from 'jspdf'
declare var QRious:any
@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
})
export class BackupPage implements OnInit {
  address:string
  public_address: string;
  filedownload: Blob;
  encrypted:string
  pdfDownload:Blob
  constructor(private permission:AndroidPermissions,private file:File,private transfer:FileTransfer,private barCodeScanner:BarcodeScanner) { }

  ngOnInit() {
    
    
    var indirizzo=localStorage.getItem('createPasswd');
    console.log(indirizzo)
    this.encrypted=indirizzo
    var indirizzosplit=localStorage.getItem('createPasswd').split(':');
    this.address=indirizzosplit[0]
    var files=new Blob([indirizzo],{type:'sid'});
    this.filedownload=files;
    
    

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
    this.file.writeFile(this.file.externalRootDirectory+'/Download/',this.address +'.sid',this.filedownload)
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

  getQRCode()
  {
  
   var QrCode=new QRious({value:this.encrypted,size:500})
   console.log(QrCode)
   var pdf=new jsPdf("p", "mm", "a4")
   console.log(QrCode.toDataURL())
   var width = pdf.internal.pageSize.getWidth();
var height = pdf.internal.pageSize.getHeight();
   pdf.addImage(QrCode.toDataURL(),"JPEG",0,0,60,60)
   var pdfOutPut=pdf.output()
   var buffer=new ArrayBuffer(pdfOutPut.length)
   var array= new Uint8Array(buffer)
   for (var i=0;i<pdfOutPut.length;i++){
     array[i]=pdfOutPut.charCodeAt(i)
   }
   
   const fileTransfer:FileTransferObject=this.transfer.create();
    
   this.file.writeFile(this.file.externalRootDirectory+'/Download/',this.address+'.pdf',buffer).then(response=>{
     console.log(response)
     alert('File '+this.address+'.pdf salvato con successo')
   }).catch(err=>{
     console.log(err)
   })
   console.log(pdf)
  }

}
