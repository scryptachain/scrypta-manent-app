import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { ToastController, ModalController } from '@ionic/angular';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';
import { OverlayEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.page.html',
  styleUrls: ['./address-book.page.scss'],
})

export class AddressBookPage implements OnInit {
  balance: string = '-'
  wallet: ''
  contacts = []
  toggleNoBalance: boolean = true
  newContactAddress: string = ''
  newContactLabel: string = ''
  newContactNotes: string = ''
  encrypted: string = ''
  showNewContact: boolean = false
  selected: number = 0
  idanode: string = 'idanodejs01.scryptachain.org'
  address: string
  transactions = []
  constructor(private clipboard: Clipboard, private qrScanner: BarcodeScanner, private toast: ToastController, private modalCtrl: ModalController, public router:Router, private _location: Location, private iab: InAppBrowser) { }

    ngOnInit() {
      const app = this
      app.showNewContact = false
      app.parseAddressBook()
    }

    parseAddressBook(){
      const app = this
      let addressBook = localStorage.getItem('addressbook')
      if(addressBook !== undefined && addressBook !== null){
        app.contacts = JSON.parse(addressBook)
      }
    }
    hideNewContact(){
      this.showNewContact = false
    }
    goBack(){
      const app = this
      app.router.navigate(['/dashboard'])
    }

    scanQRCode() {
      const app = this
      this.qrScanner.scan().then(barcodeData => {
        barcodeData.text = barcodeData.text.replace('lyra:','')
        let check = barcodeData.text.split('?')
        if(check[1] !== undefined){
          var amount = check[1].replace('amount=','')
          this.newContactAddress = check[0]
        }else{
          this.newContactAddress = barcodeData.text
        }
      }).catch(err => {
        console.log(err)
      })
  
    }

    addContact(){
      this.newContactAddress = ''
      this.newContactLabel = ''
      this.newContactNotes = ''
      this.showNewContact = true
    }

    saveContact(){
      const app = this
      var found = false
      if(app.newContactAddress.length === 34){
        for(var k in app.contacts){
          if(app.contacts[k] !== undefined){
            if(app.contacts[k].address === app.newContactAddress){
              found = true
            }
          }  
        }
        if(found === true){
          alert('This address exist yet!')
        }else{
          app.contacts.push({
            address: app.newContactAddress,
            label: app.newContactLabel,
            notes: app.newContactNotes
          })
          app.showNewContact = false
          app.newContactAddress = ''
          app.newContactLabel = ''
          app.newContactNotes = ''
          localStorage.setItem('addressbook',JSON.stringify(app.contacts))
        }
      }else{
        alert('This is not a valid address!')
      }
    }
}
