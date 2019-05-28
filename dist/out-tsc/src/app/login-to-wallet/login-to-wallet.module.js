import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginToWalletPage } from './login-to-wallet.page';
var routes = [
    {
        path: '',
        component: LoginToWalletPage
    }
];
var LoginToWalletPageModule = /** @class */ (function () {
    function LoginToWalletPageModule() {
    }
    LoginToWalletPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LoginToWalletPage]
        })
    ], LoginToWalletPageModule);
    return LoginToWalletPageModule;
}());
export { LoginToWalletPageModule };
//# sourceMappingURL=login-to-wallet.module.js.map