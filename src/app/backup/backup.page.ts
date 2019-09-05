import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { WindowRefService, ICustomWindow } from '../windowservice';
import { File } from '@ionic-native/file/ngx';
import * as jsPdf from 'jspdf'
declare var QRious: any
@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
})
export class BackupPage implements OnInit {
  address: string
  public_address: string;
  filedownload: Blob;
  private _window: ICustomWindow;
  password: string = ''
  private_key = ''
  encrypted: string
  wallet: string = ''
  selected: any = 0
  pdfDownload: Blob
  showUnlock: boolean = false
  constructor(private permission: AndroidPermissions, private file: File, private transfer: FileTransfer, windowRef: WindowRefService) {
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

    var files = new Blob([app.wallet[app.selected]], { type: 'sid' });
    this.filedownload = files;
  }
  getPermissions() {
    this.permission.hasPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE).then(status => {
      if (status.hasPermission) {
        this.downloadFile()
      }
      else {
        this.permission.requestPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE).then(status => {
          if (status.hasPermission) {
            this.downloadFile()
          }
        })
      }
    })
  }

  async downloadFile() {

    const fileTransfer: FileTransferObject = this.transfer.create();
    this.file.writeFile(this.file.externalRootDirectory + '/Download/', this.address + '.sid', this.filedownload)
    //console.log(this.file.externalDataDirectory)
    alert('File .sid salvato con Successo!')
  }

  unlock(){
    const app = this
    app.showUnlock = true
  }

  lock(){
    const app = this
    app.showUnlock = false
  }

  unlockWallet() {
    const app = this
    if (app.password !== '') {
      app._window.ScryptaCore.readKey(app.password, app.address + ':' + app.encrypted).then(function (response) {
        if (response !== false) {
          app.lock()
          app.private_key = response.prv
          app.password = ''
          app.getQRCode()
        } else {
          alert('Wrong Password')
        }
      })
    } else {
      alert('Fill all the fields!')
    }
  }

  getQRCode() {

    var QrCode = new QRious({ value: this.encrypted, size: 500 })
    
    var pdf = new jsPdf("p", "mm", "a4")
    pdf.text("Encrypted Wallet.", 57, 38)

    pdf.addImage(QrCode.toDataURL(), "JPEG", 55, 40, 100, 100)
    pdf.text("Public Address", 10, 158)
    var QrCodePublicAddress = new QRious({ value: this.address, size: 500 })
    pdf.addImage(QrCodePublicAddress.toDataURL(), "JPEG", 10, 160, 60, 60)
    pdf.text('Private Key', 140, 158)
    var decrypted = JSON.parse(localStorage.getItem('credential'));
    //console.log(localStorage.getItem('credential'))
    var QrCodeDecryptedWallet = new QRious({ value: this.private_key, size: 500 })
    pdf.addImage(QrCodeDecryptedWallet.toDataURL(), "JPEG", 140, 160, 60, 60)
    var pdfOutPut = pdf.output()
    var buffer = new ArrayBuffer(pdfOutPut.length)
    var array = new Uint8Array(buffer)
    for (var i = 0; i < pdfOutPut.length; i++) {
      array[i] = pdfOutPut.charCodeAt(i)
    }

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.file.writeFile(this.file.externalRootDirectory + '/Download/', this.address + '.pdf', buffer, { replace: true }).then(response => {
      alert('Paper wallet saved in Download folder!')
    }).catch(err => {
      alert('Can\'t save file!')
    })
  }

}
