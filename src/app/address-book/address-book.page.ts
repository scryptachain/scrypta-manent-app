import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { ToastController, ModalController } from '@ionic/angular';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';
import { OverlayEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
  encrypted: string = ''
  selected: number = 0
  idanode: string = 'idanodejs01.scryptachain.org'
  address: string
  transactions = []
  constructor(private clipboard: Clipboard, private toast: ToastController, private modalCtrl: ModalController, public router:Router, private _location: Location, private iab: InAppBrowser) { }

    ngOnInit() {
      const app = this
      app.parseAddressBook()
    }

    parseAddressBook(){

    }

    goBack(){
      const app = this
      app.router.navigate(['/dashboard'])
    }

    addContact(){

    }
    
}
