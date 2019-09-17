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
      app.readreturn[i].mimetype = response.data.data.type
      app.readreturn[i].mimedetail = response.data.data.ext
      app.readreturn[i].data = 'https://' + app.idanode + '/ipfs/' + app.readreturn[i].data 
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
        var form = new FormData()
        form.append('file', detail.data.fileObject.fileBuffer)
        form.append('dapp_address', app.address)
        form.append('private_key',  detail.data.fileObject.private_key)
        form.append('collection', '')
        if(detail.data.fileObject.message !== undefined){
          form.append('data', detail.data.fileObject.message)
        }else{
          form.append('data', '')
        }
        if(detail.data.fileObject.title !== undefined){
          form.append('refID', detail.data.fileObject.title)
        }else{
          form.append('refID', '')
        }
        let config = {
          headers: {
            'Content-type': 'multipart/form-data',
          }
        }
        axios.post('https://' + app.idanode + '/write', form, config).then(res => {
          if(res.data.uuid !== undefined){
            alert('Data written correctly into the blockchain, wait at least 2 minutes and refresh the page!')
            this.isUploading = false
          }else{
            alert('There\'s an error in the upload, please retry!')
            this.isUploading = false
          }
        }).catch(error => {
          alert('There\'s an error in the upload, please retry!')
          this.isUploading = false
        })

      }
    })
    await modal.present()
  }


}

