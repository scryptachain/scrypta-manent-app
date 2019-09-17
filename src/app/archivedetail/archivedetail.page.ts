import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-archivedetail',
  templateUrl: './archivedetail.page.html',
  styleUrls: ['./archivedetail.page.scss'],
})
export class ArchivedetailPage implements OnInit {
  @Input() response:any
  risposta
  constructor(private modalCtrl:ModalController, private iab: InAppBrowser) { }

  ngOnInit() {
    this.risposta=this.response
  }
  
  openFile(response) {
    this.iab.create(response, '_system', 'location=yes');
  }
  
  closemodal(){
    this.modalCtrl.dismiss()
  }
}
