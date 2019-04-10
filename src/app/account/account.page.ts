import { Component, OnInit } from '@angular/core';
import {Clipboard} from '@ionic-native/clipboard/ngx'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
balance:number
address:string
transactions=[]
  constructor(private clipboard:Clipboard,private toast:ToastController) { }

  ngOnInit() {
    this.fetchTransactions();
    var bal=JSON.parse(localStorage.getItem('balance'));
    console.log(bal.data)
    this.balance=bal.data
    console.log(localStorage.getItem('createPasswd'))
    var indirizzo=localStorage.getItem('createPasswd').split(':');
    console.log(indirizzo[0])
    this.address=indirizzo[0]
  }

  copyAddress()
  {
    console.log('ciao')
    this.clipboard.copy(this.address)
    
    alert('Indirizzo copiato negli appunti')
    
  
    
    
  }

  fetchTransactions()
  {
    var transazioni=JSON.parse(localStorage.getItem('transactions'));
   
    for(var i=0;i<transazioni.data.length;i++)
    {
      this.transactions.push(transazioni.data[i]);
    }
  }
}
