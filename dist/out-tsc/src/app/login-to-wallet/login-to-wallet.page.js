import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { WindowRefService } from '../windowservice';
import { Router } from '@angular/router';
import Axios from 'axios';
//import {createCipher,createDecipher} from 'crypto';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
var LoginToWalletPage = /** @class */ (function () {
    function LoginToWalletPage(nfc, ndef, qrScanner, platform, windowRef, router, fileChooser, fileOpener, filePath, file, http) {
        this.nfc = nfc;
        this.ndef = ndef;
        this.qrScanner = qrScanner;
        this.platform = platform;
        this.router = router;
        this.fileChooser = fileChooser;
        this.fileOpener = fileOpener;
        this.filePath = filePath;
        this.file = file;
        this.http = http;
        this.password = '';
        this.decrypted_wallet = '';
        this.nodes = [];
        this.connected = '';
        this._window = windowRef.nativeWindow;
    }
    LoginToWalletPage.prototype.ngOnInit = function () {
        this.checkIdaNodes();
        document.getElementById('password').style.display = 'none';
    };
    LoginToWalletPage.prototype.checkIdaNodes = function () {
        var checknodes = this._window.ScryptaCore.returnNodes();
        var app = this;
        for (var i = 0; i < checknodes.length; i++) {
            Axios.get('https://' + checknodes[i] + '/check').then(function (response) {
                app.nodes.push(response.data.name);
                if (i == checknodes.length) {
                    //console.log('stop');
                    app.connectToNode();
                }
            });
        }
    };
    LoginToWalletPage.prototype.connectToNode = function () {
        console.log(this.nodes);
        var app = this;
        if (app.connected == '') {
            app.connected = app.nodes[Math.floor(Math.random() * app.nodes.length)];
        }
    };
    LoginToWalletPage.prototype.loginCard = function () {
        var _this = this;
        var nfcreader;
        this.platform.ready().then(function () {
            nfcreader = _this.nfc.addNdefListener(function () {
                alert('successfull attached ndef');
            }, function (err) {
                alert('errore ndef');
            }).subscribe(function (event) {
                alert('Inserisci la password ed entra nel tuo wallet');
                //console.log(this.nfc.bytesToString(event.tag.ndefMessage[0].payload).substr(3));
                localStorage.setItem('createPasswd', _this.nfc.bytesToString(event.tag.ndefMessage[0].payload).substr(3));
                document.getElementById('password').style.display = 'block';
                //this.unlockWallet();
            });
            var message = _this.ndef.textRecord('Hello world');
            _this.nfc.share([message]).then().catch();
        });
    };
    LoginToWalletPage.prototype.unlockWallet = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var unlockPasswd, decrypted_wallet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.password);
                        unlockPasswd = localStorage.getItem('createPasswd');
                        decrypted_wallet = this.decrypted_wallet;
                        localStorage.setItem('decrypted_wallet', decrypted_wallet);
                        //var password=this.password;
                        decrypted_wallet = 'WALLET LOCKED';
                        //console.log(unlockPasswd);
                        //var split=unlockPasswd.split(':');
                        //console.log(split)
                        return [4 /*yield*/, this._window.ScryptaCore.readKey(this.password, unlockPasswd).then(function (response) {
                                console.log(response + 'pre');
                                if (response !== false) {
                                    decrypted_wallet = response.prv;
                                    console.log(decrypted_wallet);
                                }
                                else {
                                    alert('Wrong Password');
                                    location.reload();
                                }
                            })];
                    case 1:
                        //console.log(unlockPasswd);
                        //var split=unlockPasswd.split(':');
                        //console.log(split)
                        _a.sent();
                        this.fetchTransactions();
                        this.checkBalance();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginToWalletPage.prototype.checkBalance = function () {
        var app = this;
        var createPasswd = localStorage.getItem('createPasswd');
        var indirizzo = createPasswd.split(':');
        Axios.post('https://' + app.connected + '/getbalance', {
            address: indirizzo[0]
        }).then(function (response) {
            console.log(response);
            localStorage.setItem('balance', JSON.stringify(response.data));
            app.router.navigate(['/dashboard']);
        });
    };
    LoginToWalletPage.prototype.fetchTransactions = function () {
        var app = this;
        var createPasswd = localStorage.getItem('createPasswd');
        var indirizzo = createPasswd.split(':');
        Axios.post('https://' + app.connected + '/transactions', {
            address: indirizzo[0]
        }).then(function (response) {
            console.log('transactions', response);
            localStorage.setItem('transactions', response.request.response);
        });
    };
    /*
      readQrCode()
      {
        console.log('ci sono entrato')
        this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
         if (status.authorized) {
           // camera permission was granted
          this.qrScanner.show();
    
           // start scanning
           let scanSub = this.qrScanner.scan().subscribe((text: string) => {
             console.log('Scanned something', scanSub);
             alert(text)
    
             this.qrScanner.hide(); // hide camera preview
             scanSub.unsubscribe(); // stop scanning
           });
    
         } else if (status.denied) {
           console.log('non abilitato'+status);
           // camera permission was permanently denied
           // you must use QRScanner.openSettings() method to guide the user to the settings page
           // then they can grant the permission from there
         } else {
           // permission was denied, but not permanently. You can ask for permission again at a later time.
         }
      })
      .catch((e: any) => console.log('Error is', e));
      }
    */
    LoginToWalletPage.prototype.readQrCode = function () {
        this.qrScanner.scan().then(function (barcodeData) {
            console.log('barcode', barcodeData);
            localStorage.setItem('createPasswd', barcodeData.text);
            document.getElementById('password').style.display = 'block';
        }).catch(function (err) {
            console.log(err);
        });
    };
    LoginToWalletPage.prototype.openSidFile = function () {
        var _this = this;
        this.fileChooser.open().then(function (uploadfile) {
            console.log(uploadfile);
            _this.filePath.resolveNativePath(uploadfile).then(function (resolvedFilePath) {
                console.log(resolvedFilePath);
                _this.file.resolveLocalFilesystemUrl(resolvedFilePath).then(function (fileinfo) {
                    console.log(fileinfo);
                    _this.file.readAsText(_this.file.externalDataDirectory, fileinfo.name).then(function (result) {
                        //console.log(result);
                        localStorage.setItem('createPasswd', result);
                        document.getElementById('password').style.display = 'block';
                    });
                });
                /*
                var namefile=resolvedFilePath.split('/');
                console.log(namefile)
               this.file.readAsText(this.file.externalDataDirectory,namefile[10]).then(ffff=>{
                 console.log(ffff)
               })*/
            });
            /*
            
            this.fileOpener.open(uploadfile,'txt').then(fileopen=>{
              console.log('fileopen')
            }).catch(err=>{
              console.log('err'+err)
            })
          
        */
        });
    };
    LoginToWalletPage = tslib_1.__decorate([
        Component({
            selector: 'app-login-to-wallet',
            templateUrl: './login-to-wallet.page.html',
            styleUrls: ['./login-to-wallet.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NFC, Ndef, BarcodeScanner, Platform, WindowRefService, Router, FileChooser, FileOpener, FilePath, File, HTTP])
    ], LoginToWalletPage);
    return LoginToWalletPage;
}());
export { LoginToWalletPage };
//# sourceMappingURL=login-to-wallet.page.js.map