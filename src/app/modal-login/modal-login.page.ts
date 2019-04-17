import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewController, ModalOptions } from '@ionic/core';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.page.html',
  styleUrls: ['./modal-login.page.scss'],
})
export class ModalLoginPage implements OnInit {
  password:string
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {

  }


  closeModal()
  {
    
       this.setLocalStorage()
    console.log(this.password)
    localStorage.setItem('unlockPassword',this.password);
    this.modalCtrl.dismiss(this.password)

  }

  async setLocalStorage()
  {
    var date=new Date();
      console.log('DATE',date.toString())
      await localStorage.removeItem('transactions')
      await localStorage.removeItem('transactions2')
    await localStorage.removeItem('loginDate')
   await localStorage.setItem('loginDate',date.toString());
   
  }
}
