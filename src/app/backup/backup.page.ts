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
    
    
    var indirizzo=localStorage.getItem('lyraWallet');
    console.log(indirizzo)
    this.encrypted=indirizzo
    var indirizzosplit=localStorage.getItem('lyraWallet').split(':');
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
   
    
    const fileTransfer:FileTransferObject=this.transfer.create();
    console.log(fileTransfer);
    this.file.writeFile(this.file.externalRootDirectory+'/Download/',this.address +'.sid',this.filedownload)
    console.log(this.file.externalDataDirectory)
    alert('File .sid salvato con Successo!')
   
 
  }

  getQRCode()
  {
  
   var QrCode=new QRious({value:this.encrypted,size:500})
   console.log(QrCode)
   var pdf=new jsPdf("p", "mm", "a4")
   pdf.text("Encrypted Wallet.",57,38)
   console.log(QrCode.toDataURL())
   
   pdf.addImage(QrCode.toDataURL(),"JPEG",55,40,100,100)
   pdf.text("Public Address",10,158)
   var QrCodePublicAddress=new QRious({value:this.address,size:500})
   pdf.addImage(QrCodePublicAddress.toDataURL(),"JPEG",10,160,60,60)
   pdf.text('Private Key',140,158)
   var decrypted=JSON.parse(localStorage.getItem('credential'));
   //console.log(localStorage.getItem('credential'))
   var QrCodeDecryptedWallet=new QRious({value:decrypted.prv,size:500})
   pdf.addImage(QrCodeDecryptedWallet.toDataURL(),"JPEG",140,160,60,60)
   var pdfOutPut=pdf.output()
   var buffer=new ArrayBuffer(pdfOutPut.length)
   var array= new Uint8Array(buffer)
   for (var i=0;i<pdfOutPut.length;i++){
     array[i]=pdfOutPut.charCodeAt(i)
   }
   
   const fileTransfer:FileTransferObject=this.transfer.create();
    
   this.file.writeFile(this.file.externalRootDirectory+'/Download/',this.address+'.pdf',buffer,{replace:true}).then(response=>{
     console.log(response)
     alert('File '+this.address+'.pdf salvato con successo')
   }).catch(err=>{
     console.log(err)
   })
   console.log(pdf)
  }

}
