import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { WindowRefService } from '../windowservice';
import axios from 'axios';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
var SendPage = /** @class */ (function () {
    function SendPage(windowRef, qrScanner) {
        this.qrScanner = qrScanner;
        this.nodes = [];
        this.connected = '';
        this._window = windowRef.nativeWindow;
    }
    SendPage.prototype.ngOnInit = function () {
        document.getElementById('password').style.display = 'none';
        document.getElementById('buttonSend').style.display = 'none';
        var bal = JSON.parse(localStorage.getItem('balance'));
        this.balance = bal.data;
        this.checkIdaNodes();
        this.checkUser();
    };
    SendPage.prototype.checkIdaNodes = function () {
        var checknodes = this._window.ScryptaCore.returnNodes();
        var app = this;
        for (var i = 0; i < checknodes.length; i++) {
            axios.get('https://' + checknodes[i] + '/check').then(function (response) {
                app.nodes.push(response.data.name);
                if (i == checknodes.length) {
                    app.connectToNode();
                }
            });
        }
    };
    SendPage.prototype.connectToNode = function () {
        var app = this;
        if (app.connected == '') {
            app.connected = app.nodes[Math.floor(Math.random() * app.nodes.length)];
        }
    };
    SendPage.prototype.checkUser = function () {
        var address = localStorage.getItem('createPasswd').split(':');
        console.log(address);
        this.public_address = address[0];
        this.encrypted_wallet = address[1];
        console.log(this.encrypted_wallet);
        console.log(this.public_address);
    };
    /*
    openUnlockWallet()
    {
      if(this.addressToSend !=='' &&  this.amountToSend > 0){
        document.getElementById('password').style.display='block'
      }
    }
    */
    SendPage.prototype.unlockWallet = function () {
        if (this.unlockPwd !== '') {
            var unlockPasswd = localStorage.getItem('createPasswd');
            console.log(this.unlockPwd);
            var app = this;
            app.decrypted_wallet = 'Wallet Locked';
            app._window.ScryptaCore.readKey(this.unlockPwd, unlockPasswd).then(function (response) {
                if (response !== false) {
                    app.private_key = response.key;
                    app.api_secret = response.api_secret;
                    app.sendLyra();
                }
                else {
                    alert('Wrong Password');
                }
            });
        }
        else {
            alert('Write your password first');
        }
    };
    SendPage.prototype.sendLyra = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var unlockPasswd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unlockPasswd = localStorage.getItem('createPasswd');
                        console.log(unlockPasswd);
                        return [4 /*yield*/, this._window.ScryptaCore.send(this.unlockPwd, '', this.addressToSend, this.amountToSend, '', '', unlockPasswd).then(function (result) {
                                alert('Successfull!!\n Your txid is :' + result);
                            }).catch(function (err) {
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SendPage.prototype.scanQRCode = function () {
        var _this = this;
        this.qrScanner.scan().then(function (barcodeData) {
            console.log('barcode', barcodeData);
            _this.addressToSend = barcodeData.text;
            document.getElementById('password').style.display = 'block';
        }).catch(function (err) {
            console.log(err);
        });
    };
    SendPage.prototype.unlockButton = function () {
        document.getElementById('buttonSend').style.display = 'block';
    };
    SendPage = tslib_1.__decorate([
        Component({
            selector: 'app-send',
            templateUrl: './send.page.html',
            styleUrls: ['./send.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [WindowRefService, BarcodeScanner])
    ], SendPage);
    return SendPage;
}());
export { SendPage };
//# sourceMappingURL=send.page.js.map