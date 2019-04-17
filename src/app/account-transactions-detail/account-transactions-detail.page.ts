import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-account-transactions-detail',
  templateUrl: './account-transactions-detail.page.html',
  styleUrls: ['./account-transactions-detail.page.scss'],
})
export class AccountTransactionsDetailPage implements OnInit {
  @Input() response:any
  risposta
  constructor(private modalCtrl:ModalController) { 
   
  }

  ngOnInit() {
    this.risposta=this.response
    console.log(this.risposta)
  }

  close(){
    this.modalCtrl.dismiss()
  }

}
