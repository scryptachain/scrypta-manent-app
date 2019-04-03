import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WindowRefService } from './windowservice';
import ScryptaCore from 'assets/js/scryptacore_bk.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file/';
import {File} from '@ionic-native/file/ngx'
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import {createCipher,createDecipher} from 'crypto';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx'



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
 BarcodeScanner,
    //QRScanner,
    //AndroidPermissions,
    NFC,
    Ndef,
    File,
    FileTransfer,
    FileTransferObject,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
