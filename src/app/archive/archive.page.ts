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
    await app._window.ScryptaCore.readKey(localStorage.getItem('unlockPassword'),localStorage.getItem('lyraWallet')).then(async function(response){
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
  var credentials=localStorage.getItem('lyraWallet').split(':');
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
   var link
   var FormData=require('form-data')
  // var fs=require('fs')
 
   const modal=await this.modalCtrl.create({
     component:UploadModalPage
   })
   modal.onDidDismiss().then(async (detail:OverlayEventDetail)=>{
    if(detail!=null)
    {
      var public_addr=localStorage.getItem('lyraWallet').split(':')
      console.log(detail);
      console.log('private',this.private_key)
      console.log('wallet',localStorage.getItem('lyraWallet'))
      console.log('credential',localStorage.getItem('credential'))
     var form=new FormData()
     form.append('file',detail.data.fileObject.fileBuffer)
     form.append('dapp_address',public_addr[0])
     form.append('api_secret',this.api_secret)
     form.append('private_key',this.private_key)
     form.append('encryption',detail.data.fileObject.Encrypt)
     form.append('collection','')
     form.append('data',detail.data.fileObject.message)
     form.append('refID',detail.data.fileObject.title)
     

     console.log(Array.from(form))
     await Axios.post('https://'+this.connected+'/ipfs/add',form,{
       headers:{
        'Content-Type': 'multipart/form-data'
       }
     }).then(res=>{
       console.log(res)
       link=res.data.data
       console.log(res.data.data.length)
     })
      console.log(localStorage.getItem('credentials'))
      console.log('link',link)
      var metadata='ipfs:'+link
      console.log(metadata)
      //console.log('FORMDATA',this.formdata)
      
      await this._window.ScryptaCore.write(
       'assocoinlab',
        metadata,
        '',
        '',
        '',
        'LTK3Yq87ni6dm2mY2EWCaci3HaZATrafGm:8e183f091de1f7efb4f71c9351bef415606f4246dfcbb0185ed490f3c4ff37bd35cb6f289e9ab7284bc763f5fafff14bdfb3d2e23b35b54939c6cc1487fcb5a230d89d93dc18902ddad376c13096be5ac58202e1abb2a578727c4025fd43e6c8fd6ba322b070960eb859128b73211811'
      ).then(response=>{
        console.log('risposta da scrypta',response)
      })
      
       

    
     

      
    }
  })
  await modal.present()
 }
 

}

