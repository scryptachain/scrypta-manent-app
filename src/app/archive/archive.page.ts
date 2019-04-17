import { Component, OnInit } from '@angular/core';
import Axios from 'axios'
import { WindowRefService, ICustomWindow } from '../windowservice';
import { LoadingController, ModalController } from '@ionic/angular';
import { ArchivedetailPage } from '../archivedetail/archivedetail.page';
import { OverlayEventDetail } from '@ionic/core';

import { UploadModalPage } from '../upload-modal/upload-modal.page';
import { from } from 'rxjs';
import {File} from '@ionic-native/file/ngx'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  nodes:string[]=[];
  connected:string='';
  private _window: ICustomWindow;
  readerror: string;
  api_secret: string;
  readreturn: any[]=[];
  readreturn2: any[]=[];
  tableItems:any []=[]
  private_key:string
  encrypted:boolean=false
  formdata={
    file:[],
    dapp_address:this.connected,
    api_secret:this.api_secret,
    private_key:this.private_key,
    encryption:this.encrypted,
    collection:'',
    data:'',
    refID:''
  }
  

  constructor(windowRef: WindowRefService,private loadingController:LoadingController,private modalCtrl:ModalController,private file:File

    ) {
    this._window = windowRef.nativeWindow;
   }

  ngOnInit() {
    this.checkIdaNodes();
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
async connectToNode()
{
 
  var app = this
  if(app.connected == ''){
    app.connected = app.nodes[Math.floor(Math.random()*app.nodes.length)];
    console.log(this.nodes);
    
    var walletstore=JSON.parse(localStorage.getItem('credential'))
    await app._window.ScryptaCore.readKey(localStorage.getItem('unlockPassword'),localStorage.getItem('createPasswd')).then(async function(response){
      console.log('unlock',response)
     app.api_secret=response.api_secret
     app.private_key=response.prv
     await app.readData()
    }).catch(err=>{
      console.log('errore',err)
    })
    
}
}

async readData()
{
  const app = this
  app.readerror = ''
  var credentials=localStorage.getItem('createPasswd').split(':');
  console.log(credentials)
  await Axios.post('https://'+app.connected+'/read',{

    api_secret:app.api_secret,
    decrypt:false,
    address:credentials[0],
    history:false
  }).then(async  function (response){
    console.log('readreturn',response)
    console.log('length',response.data.data.length)
    app.readreturn=response.data.data;
    for(var i=0;i<app.readreturn.length;i++){
      console.log(app.readreturn[i])
      if(app.readreturn[i]['is_file'])
      {
        var hash=app.readreturn[i]['ipfshash']
       await app.retrieveInfo(hash,i)
        
      }
      
    await app.returnTableItems()
    }
    
  })

}

async retrieveInfo(hash,i:number)
{
  const loading= await this.loadingController.create({
    spinner:'circles',
   
    message:'Please Wait...',
    translucent:true,
  })
  await loading.present();
  var moment=require('moment')
  const app=this
 await  Axios.post('https://'+app.connected+'/ipfs/retrieve',{
    hash:hash
  }).then(async function(response){
    console.log('retrieve',response)
    //console.log('readreturn',app.readreturn[i].uuid)
      app.readreturn[i].mimetype=response.data.data.type
      app.readreturn[i].mimedetail=response.data.data.detail
      app.readreturn[i].datetime=moment.unix(app.readreturn[i].time).format('"hh:mm a, MM/DD/YYYY"'),
    console.log('AFTER',app.readreturn[i])
      app.readreturn2=app.readreturn
      
      await loading.dismiss()
  })

  //console.log(('readreturn2'),app.readreturn)
}

async returnTableItems()
{
  var moment=require('moment')
  var date =new Date()
  const app=this
  for(var i=0;i<app.readreturn.length;i++){
  await  app.tableItems.push({
      uuid:app.readreturn[i].uuid,
      block:app.readreturn[i].block,
      date:moment.unix(app.readreturn[i].time).format('"hh:mm a, MM/DD/YYYY"'),
      data:app.readreturn[i].data
  

    })
  }
  await console.log('tableItems',this.tableItems)
}

async generic(response)
{
  const modal= await this.modalCtrl.create({
    component:ArchivedetailPage,
    componentProps:{
      response:response
    }
  });
  
  modal.onDidDismiss().then((detail:OverlayEventDetail)=>{
    if(detail!=null)
    {
      console.log(detail);
      
    }
  })
  await modal.present()
}

doRefresh(event) {
  console.log('Begin async operation');
  window.location.reload()
  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}



 async openModalUpload()
 {
   var FormData=require('form-data')
  // var fs=require('fs')
 
   const modal=await this.modalCtrl.create({
     component:UploadModalPage
   })
   modal.onDidDismiss().then(async (detail:OverlayEventDetail)=>{
    if(detail!=null)
    {
      var public_addr=localStorage.getItem('createPasswd').split(':')
      console.log(detail);
      var fileInfo={
        'lastModified':'1554226040404',
        'name':'nuovo_documento_di testo',
        'size':259,
        'type':'',
        'webkitRelativePath':''

      }
     this.formdata.file.push(fileInfo)
     this.formdata.private_key=this.private_key 
     this.formdata.api_secret=this.api_secret
     this.formdata.dapp_address=public_addr[0]
     this.formdata.encryption=detail.data.fileObject.Encrypt
     this.formdata.data=detail.data.fileObject.message
     this.formdata.refID=detail.data.fileObject.title
     
     var form=new FormData()
     form.append('file',detail.data.fileObject.file)
     form.append('dapp_address',public_addr[0])
     form.append('api_secret',this.api_secret)
     form.append('private_key',this.private_key)
     form.append('encryption',detail.data.fileObject.Encrypt)
     form.append('collection','')
     form.append('data',detail.data.fileObject.message)
     form.append('refID',detail.data.fileObject.title)
     

     console.log(Array.from(form))
     await Axios.post('https://'+this.connected+'/ipfs/add',Array.from(form),{
       headers:{
        'Content-Type': 'multipart/form-data'
       }
     }).then(res=>{
       console.log(res)
       console.log(form)
     })

/*
      console.log('FORMDATA',this.formdata)
      Axios.post('https://'+this.connected+'/write',form,{
       
      }).then(response=>{
        console.log(response)
      })
     */

      
    }
  })
  await modal.present()
 }
 

}

