import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fileURLToPath } from 'url';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {File} from '@ionic-native/file/ngx'
import {FormGroup} from '@angular/forms'
@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.page.html',
  styleUrls: ['./upload-modal.page.scss'],
})
export class UploadModalPage implements OnInit {
  public fileInput: FormGroup;
  title:string
  file:string
  fileName:string
  message:string
  passwordEncrypt:string
  repeatPasswordEncrypt:string
  fileBuffer:any
  fileUploaded:any

  toggleChecked:boolean=false

  uploadForm={
    title:'',
    file:'',
    message:'',
    Encrypt:this.toggleChecked,
    password:'',
    fileBuffer:''
    
  }
  constructor(private modalCtrl:ModalController,private fileChooser:FileChooser,private fileOpener:FileOpener,private filePath:FilePath,private fileUpload:File) { 
   
    
  }

  ngOnInit() {
    document.getElementById('passwordFields').style.display='none'

  }

  close(){
this.modalCtrl.dismiss()
  }


  showPasswordLabel()
  {
    if(this.toggleChecked==true)
    {
    document.getElementById('passwordFields').style.display='block'
    }

    else{
      document.getElementById('passwordFields').style.display='none'
    }
  }

selectFile()
{
  this.fileChooser.open().then(fileUri=>{
    //this.fileName=fileUri
    this.filePath.resolveNativePath(fileUri).then(resolveFilePath=>{
      console.log('filepathresolve',resolveFilePath)

      this.fileUpload.resolveLocalFilesystemUrl(resolveFilePath).then(fileInfo=>{
        var metadata=fileInfo.getMetadata(resp=>{
          console.log('MEtadada',resp)
          this.fileBuffer=resp
        })
        
        console.log('FileInfo',fileInfo)
        this.fileName=fileInfo.name
        this.file=fileInfo.nativeURL
        var imagefile = document.querySelector('#fileInput');
        console.log('IMAGEFILE',imagefile)
        
        console.log('fileBuffer',fileInfo)
       
      })
    })
  })

}
  save()
  {

    console.log(this.uploadForm)
    this.uploadForm.title=this.title
    this.uploadForm.file=this.file
    this.uploadForm.Encrypt=this.toggleChecked
    this.uploadForm.password=this.passwordEncrypt
    this.uploadForm.message=this.message
    this.uploadForm.fileBuffer=this.fileBuffer
    this.modalCtrl.dismiss({
      fileObject:this.uploadForm
    })
    //console.log(this.uploadForm)

  }
}
