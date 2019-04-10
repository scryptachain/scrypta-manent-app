import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WindowRefService } from './windowservice';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file/';
import { File } from '@ionic-native/file/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import {createCipher,createDecipher} from 'crypto';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                BrowserModule,
                IonicModule.forRoot(),
                AppRoutingModule
            ],
            providers: [
                Clipboard,
                HTTP,
                BarcodeScanner,
                //QRScanner,
                //AndroidPermissions,
                FileChooser,
                FileOpener,
                FilePath,
                Diagnostic,
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map