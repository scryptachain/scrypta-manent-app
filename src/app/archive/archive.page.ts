import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { WindowRefService, ICustomWindow } from '../windowservice';
import { LoadingController, ModalController } from '@ionic/angular';
import { ArchivedetailPage } from '../archivedetail/archivedetail.page';
import { OverlayEventDetail } from '@ionic/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UploadModalPage } from '../upload-modal/upload-modal.page';
import { from } from 'rxjs';
import { File } from '@ionic-native/file/ngx'
var moment = require('moment')

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  nodes: string[] = [];
  wallet = []
  address: string = ''
  idanode: string = 'idanodejs01.scryptachain.org'
  selected: number = 0
  balance: string = '-'
  workingmessage: string = 'Uploading data, please wait and don\'t refresh the page'
  encrypted: string = ''
  isUploading: boolean = false
  private _window: ICustomWindow;
  readerror: string;
  api_secret: string;
  readreturn: any[] = [];
  tableItems: any[] = []
  private_key: string
  encrypt: boolean = false
  formdata = {
    file: [],
    dapp_address: this.address,
    api_secret: this.api_secret,
    private_key: this.private_key,
    encryption: this.encrypted,
    collection: '',
    data: '',
    refID: ''
  }


  constructor(windowRef: WindowRefService, private loadingController: LoadingController, private modalCtrl: ModalController, private file: File,  private iab: InAppBrowser

  ) {
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
    const app = this
    if (localStorage.getItem('selected') !== null) {
      app.selected = parseInt(localStorage.getItem('selected'))
    }
    app.wallet = JSON.parse(localStorage.getItem('wallet'))
    let payload = app.wallet[app.selected].split(':')
    app.address = payload[0]
    app.encrypted = payload[1]
    this.readData()
  }

  async readData() {
    const app = this
    app.readerror = ''
    await axios.post('https://' + app.idanode + '/read', {
      decrypt: false,
      address: app.address,
      history: false
    }).then(async function (response) {
      app.readreturn = response.data.data;
      for (var i = 0; i < app.readreturn.length; i++) {
        if (app.readreturn[i]['is_file']) {
          var hash = app.readreturn[i]['data']
          await app.retrieveInfo(hash, i)
        }
        app.readreturn[i].datetime = moment.unix(app.readreturn[i].time).format('MM/DD/YYYY - HH:mm')
        await app.returnTableItems()
      }

    })

  }

  async retrieveInfo(hash, i: number) {
    
    const app = this
    await axios.get('https://' + app.idanode + '/ipfs/type/' + hash).then(async function (response) {
      if(response.data.data !== undefined){
        app.readreturn[i].mimetype = response.data.data.type
        app.readreturn[i].mimedetail = response.data.data.ext
        app.readreturn[i].data = 'https://' + app.idanode + '/ipfs/' + app.readreturn[i].data 
      }
    })

  }

  async returnTableItems() {
    var moment = require('moment')
    var date = new Date()
    const app = this
    for (var i = 0; i < app.readreturn.length; i++) {
      app.tableItems.push({
        uuid: app.readreturn[i].uuid,
        block: app.readreturn[i].block,
        date: moment.unix(app.readreturn[i].time).format('"hh:mm a, MM/DD/YYYY"'),
        data: app.readreturn[i].data
      })
    }
  }

  async generic(response) {
    const modal = await this.modalCtrl.create({
      component: ArchivedetailPage,
      componentProps: {
        response: response
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail != null) {
      }
    })
    await modal.present()
  }

  doRefresh(event) {
    this.readData()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  
  async openModalUpload() {
    const app = this
    var FormData = require('form-data')

    const modal = await this.modalCtrl.create({
      component: UploadModalPage
    })

    modal.onDidDismiss().then(async (detail: OverlayEventDetail) => {
      if (detail.data !== undefined && this.isUploading === false) {
        this.isUploading = true
        var errors = false
        var file = ''
        var protocol = ''
        var password = detail.data.fileObject.password
        var message = ''
        let config = {
          headers: {
            'Content-type': 'multipart/form-data',
          }
        }
        if(detail.data.fileObject.fileBuffer !== undefined){
          if(detail.data.fileObject.encrypt === true){
            const form_data = new FormData()
            app.workingmessage = 'Crypting file...'
            var crypted = await app._window.ScryptaCore.cryptFile(detail.data.fileObject.fileBuffer,detail.data.fileObject.encryptPwd)
            form_data.append("buffer", crypted)
            app.workingmessage = 'Uploading file to IPFS...'
            var ipfs = await axios.post('https://' + app.idanode + '/ipfs/add', form_data, config)
            var hash = ipfs.data.data[0].hash
            if(hash !== undefined){
              app.workingmessage = 'Verifying IPFS file...'
              let buffer = await axios.get('https://' + app.idanode + '/ipfs/buffer/' + hash)
              let data = buffer.data.data[0].content.data
              app.workingmessage = 'Verifying crypted file...'
              let decrypted = await app._window.ScryptaCore.decryptFile(data, detail.data.fileObject.encryptPwd)
              if(decrypted !== false){
                message = 'ipfs:' + hash
                protocol = 'E://'
              }else{
                errors = true
                alert('Something goes wrong encryption, please retry.')
              }
            }else{
              errors = true
              alert('Something goes wrong with IPFS, please make sure your file is less than 10MB.')
            }
          }else{
            const form_data = new FormData()
            form_data.append("file", detail.data.fileObject.fileBuffer)
            var ipfs = await axios.post('https://' + app.idanode + '/ipfs/add', form_data, config)
            var hash = ipfs.data.data.hash
          }
          if(detail.data.fileObject.message !== undefined){
            message += '***' + detail.data.fileObject.message
          }
        }else{
          if(detail.data.fileObject.message !== undefined){
            message = detail.data.fileObject.message
          }
        }
        
        var refID = ''
        if(detail.data.fileObject.title !== undefined){
          refID = detail.data.fileObject.title
        }
        if(detail.data.fileObject.fileBuffer === undefined && detail.data.fileObject.encrypt === true){
          app.workingmessage = 'Crypting data...'
          var crypted = await app._window.ScryptaCore.cryptData(message, detail.data.fileObject.encryptPwd)
          app.workingmessage = 'Verifying data...'
          var decrypted = await app._window.ScryptaCore.decryptData(crypted, detail.data.fileObject.encryptPwd)
          if(decrypted === message){
            message = crypted
            protocol = 'E://'
          }else{
            alert('Something goes wrong with encryption, please retry!')
            errors = true
          }
        }
        if(errors === false){
          app.workingmessage = 'Uploading data...'
          app._window.ScryptaCore.write(password, message, '', refID , protocol, app.address + ':' + app.encrypted).then(res => {
            console.log(res)
            if(res.uuid !== undefined){
              alert('Data written correctly into the blockchain, wait at least 2 minutes and refresh the page!')
              this.isUploading = false
            }else{
              alert('There\'s an error in the upload, please retry!')
              this.isUploading = false
            }
          }).catch(error => {
            console.log(error)
            alert('There\'s an error in the upload, please retry!')
            this.isUploading = false
          })
        }else{
          this.isUploading = false
        }
        
      }
    })
    await modal.present()
  }


}

