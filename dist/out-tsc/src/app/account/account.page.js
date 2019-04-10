import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';
var AccountPage = /** @class */ (function () {
    function AccountPage(clipboard, toast) {
        this.clipboard = clipboard;
        this.toast = toast;
        this.transactions = [];
    }
    AccountPage.prototype.ngOnInit = function () {
        this.fetchTransactions();
        var bal = JSON.parse(localStorage.getItem('balance'));
        console.log(bal.data);
        this.balance = bal.data;
        console.log(localStorage.getItem('createPasswd'));
        var indirizzo = localStorage.getItem('createPasswd').split(':');
        console.log(indirizzo[0]);
        this.address = indirizzo[0];
    };
    AccountPage.prototype.copyAddress = function () {
        console.log('ciao');
        this.clipboard.copy(this.address);
        alert('Indirizzo copiato negli appunti');
    };
    AccountPage.prototype.fetchTransactions = function () {
        var transazioni = JSON.parse(localStorage.getItem('transactions'));
        for (var i = 0; i < transazioni.data.length; i++) {
            this.transactions.push(transazioni.data[i]);
        }
    };
    AccountPage = tslib_1.__decorate([
        Component({
            selector: 'app-account',
            templateUrl: './account.page.html',
            styleUrls: ['./account.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Clipboard, ToastController])
    ], AccountPage);
    return AccountPage;
}());
export { AccountPage };
//# sourceMappingURL=account.page.js.map