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
    
    this.modalCtrl.dismiss(this.password)
  }

}
