import { Component, OnInit } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../windowservice';
import { ModalController } from '@ionic/angular';
import { fileURLToPath } from 'url';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx'
import { FormGroup } from '@angular/forms'
@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.page.html',
  styleUrls: ['./upload-modal.page.scss'],
})
export class UploadModalPage implements OnInit {
  public fileInput: FormGroup;
  title: string
  file: string
  fileName: string
  message: string
  passwordEncrypt: string
  repeatPasswordEncrypt: string
  fileBuffer: any
  fileUploaded: any
  toggleChecked: boolean = false
  wallet: ''
  encrypted: string = ''
  selected: number = 0
  address: string
  nodes: string[] = [];
  connected: string = '';
  public_address: string;
  encrypted_wallet: string;
  unlockPwd: string;
  decrypted_wallet: string;
  private_key: any;
  uploadForm = {
    title: '',
    file: '',
    message: '',
    encrypt: this.toggleChecked,
    private_key: '',
    fileBuffer: ''
  }
  private _window: ICustomWindow;

  constructor(windowRef: WindowRefService, private modalCtrl: ModalController, private fileChooser: FileChooser, private fileOpener: FileOpener, private filePath: FilePath, private fileUpload: File) {
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
  }

  close() {
    this.modalCtrl.dismiss()
  }

  selectFile() {
    this.fileChooser.open().then(fileUri => {
      this.filePath.resolveNativePath(fileUri).then(resolveFilePath => {
        this.fileUpload.resolveLocalFilesystemUrl(resolveFilePath).then(fileInfo => {
          var metadata = fileInfo.getMetadata(resp => {
          })
          this.fileName = fileInfo.name
          this.file = fileInfo.nativeURL
        })
      })
    })


  }

  getAttributes() {
    var imagefile: any
    imagefile = window.document.querySelector('#fileInput')
    this.fileBuffer = imagefile.files[0]
    console.log('IMAGEFILE', imagefile.files)
  }

  unlockWallet() {
    const app = this
    if (app.unlockPwd !== undefined) {
      app.decrypted_wallet = 'Wallet Locked'
      app._window.ScryptaCore.readKey(app.unlockPwd, app.address + ':' + app.encrypted).then(function (response) {
        if (response !== false) {
          app.save(response.prv);
        } else {
          alert('Wrong Password')
        }
      })
    } else {
      alert('Fill all the fields!')
    }
  }

  save(privkey) {
    const app = this
    this.uploadForm.title = this.title
    this.uploadForm.file = this.file
    this.uploadForm.encrypt = this.toggleChecked
    this.uploadForm.private_key = privkey
    this.uploadForm.message = this.message
    this.uploadForm.fileBuffer = this.fileBuffer
    this.modalCtrl.dismiss({
      fileObject: this.uploadForm
    })
  }
}
