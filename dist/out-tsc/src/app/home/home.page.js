import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { WindowRefService } from '../windowservice';
import { Router } from '@angular/router';
import axios from 'axios';
var HomePage = /** @class */ (function () {
    function HomePage(windowRef, navCtrl, router) {
        this.router = router;
        this.nodes = [];
        this.backupAlert = true;
        this.connected = "";
        this.address_balance = '';
        this.transactionMessage = 'Loading transactions...';
        this._window = windowRef.nativeWindow;
        //this.create()
    }
    HomePage.prototype.ngOnInit = function () {
        this.checkIdaNodes();
        this.checkUser();
        setTimeout(function () {
            this.backupAlert = false;
        });
    };
    HomePage.prototype.checkIdaNodes = function () {
        var checkNodes = this._window.ScryptaCore.returnNodes();
        var app = this;
        for (var i = 0; i < checkNodes.length; i++) {
            axios.get('https://' + checkNodes[i] + '/check')
                .then(function (response) {
                app.nodes.push(response.data.name);
                if (i == checkNodes.length) {
                    app.connectToNode();
                }
            });
        }
    };
    HomePage.prototype.connectToNode = function () {
        var app = this;
        if (app.connected == '') {
            app.connected = app.nodes[Math.floor(Math.random() * app.nodes.length)];
            //app.checkBalance()
            //app.fetchTransactions()
        }
    };
    HomePage.prototype.checkUser = function () {
        if (this._window.ScryptaCore.keyExsist()) {
            this.public_address = this._window.ScryptaCore.PubAddress;
            this.encrypted_wallet = this._window.ScryptaCore.RAWsAPIKey;
            console.log(this.encrypted_wallet);
        }
    };
    HomePage.prototype.createWallet = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.password);
                        app = this;
                        if (!(app.password !== '' && app.password == app.repassword)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._window.ScryptaCore.createAddress(app.password, true).then(function (response) {
                                axios.post('https://' + app.connected + '/init', {
                                    address: response.pub,
                                    api_secret: response.api_secret
                                }).then(function () {
                                    console.log(response);
                                    localStorage.setItem('credential', JSON.stringify(response));
                                    app.router.navigate(['/congratulations']);
                                }).catch(function (err) {
                                    console.log(err);
                                    alert("Seems there's a problem, please retry or change node!");
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        alert('Password is incorrect!');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [WindowRefService,
            NavController,
            Router])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map