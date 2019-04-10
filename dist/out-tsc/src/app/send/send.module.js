import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SendPage } from './send.page';
var routes = [
    {
        path: '',
        component: SendPage
    }
];
var SendPageModule = /** @class */ (function () {
    function SendPageModule() {
    }
    SendPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SendPage]
        })
    ], SendPageModule);
    return SendPageModule;
}());
export { SendPageModule };
//# sourceMappingURL=send.module.js.map