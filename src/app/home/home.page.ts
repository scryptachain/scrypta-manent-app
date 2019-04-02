import { Component } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../windowservice';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private _window: ICustomWindow;
  constructor(
    windowRef: WindowRefService
  ){
    this._window = windowRef.nativeWindow;
    this.create()
  }
  async create(){
    var address = await this._window.ScryptaCore.createAddress('dodododo')
    alert(address.pub)
  }
}
