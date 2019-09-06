import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { WindowRefService, ICustomWindow } from '../windowservice';
import { LoadingController, ModalController } from '@ionic/angular';
import { ArchivedetailPage } from '../archivedetail/archivedetail.page';
import { OverlayEventDetail } from '@ionic/core';

import { UploadModalPage } from '../upload-modal/upload-modal.page';
import { from } from 'rxjs';
import { File } from '@ionic-native/file/ngx'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  nodes: string[] = [];
  connected: string = '';
  wallet = []
  address: string = ''
  selected: number = 0
  balance: string = '-'
  encrypted: string = ''
  private _window: ICustomWindow;
  readerror: string;
  api_secret: string;
  readreturn: any[] = [];
  readreturn2: any[] = [];
  tableItems: any[] = []
  private_key: string
  encrypt: boolean = false
  formdata = {
    file: [],
    dapp_address: this.connected,
    api_secret: this.api_secret,
    private_key: this.private_key,
    encryption: this.encrypted,
    collection: '',
    data: '',
    refID: ''
  }


  constructor(windowRef: WindowRefService, private loadingController: LoadingController, private modalCtrl: ModalController, private file: File

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
    this.checkIdaNodes();
  }
  checkIdaNodes() {
    var checknodes = this._window.ScryptaCore.returnNodes();
    const app = this
    for (var i = 0; i < checknodes.length; i++) {
      axios.get('https://' + checknodes[i] + '/check').then(function (response) {
        app.nodes.push(response.data.name)
        if (i == checknodes.length) {
          //console.log('stop');
          app.connectToNode();
        }
      })
    }
  }
  async connectToNode() {

    var app = this
    if (app.connected == '') {
      app.connected = app.nodes[Math.floor(Math.random() * app.nodes.length)];
      app.readData()
    }
  }

  async readData() {
    const app = this
    app.readerror = ''
    await axios.post('https://' + app.connected + '/read', {
      decrypt: false,
      address: app.address,
      history: false
    }).then(async function (response) {
      app.readreturn = response.data.data;
      for (var i = 0; i < app.readreturn.length; i++) {
        console.log(app.readreturn[i])
        if (app.readreturn[i]['is_file']) {
          var hash = app.readreturn[i]['ipfshash']
          await app.retrieveInfo(hash, i)
        }
        await app.returnTableItems()
      }

    })

  }

  async retrieveInfo(hash, i: number) {
    
    var moment = require('moment')
    const app = this
    await axios.post('https://' + app.connected + '/ipfs/retrieve', {
      hash: hash
    }).then(async function (response) {
      //console.log('readreturn',app.readreturn[i].uuid)
      app.readreturn[i].mimetype = response.data.data.type
      app.readreturn[i].mimedetail = response.data.data.detail
      app.readreturn[i].datetime = moment.unix(app.readreturn[i].time).format('"hh:mm a, MM/DD/YYYY"'),
      app.readreturn2 = app.readreturn
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
      if (detail.data !== undefined) {
        var form = new FormData()
        form.append('file', detail.data.fileObject.fileBuffer)
        form.append('dapp_address', app.address)
        form.append('private_key',  detail.data.fileObject.private_key)
        form.append('encryption', detail.data.fileObject.encrypt)
        form.append('collection', '')
        form.append('data', detail.data.fileObject.message)
        form.append('refID', detail.data.fileObject.title)
        axios.post('https://' + this.connected + '/write', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          alert('Data written correctly into the blockchain, wait at least 2 minutes and refresh the page!')
        }).catch(error => {
          alert('There\'s an error in the upload, please retry!')
        })

      }
    })
    await modal.present()
  }


}

