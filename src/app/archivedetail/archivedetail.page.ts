import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-archivedetail',
  templateUrl: './archivedetail.page.html',
  styleUrls: ['./archivedetail.page.scss'],
})
export class ArchivedetailPage implements OnInit {
  @Input() response:any
  risposta
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    this.risposta=this.response
    
  }
closemodal()
{
  this.modalCtrl.dismiss()
}
}
