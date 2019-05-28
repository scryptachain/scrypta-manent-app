import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConverterPage } from './converter.page';
var routes = [
    {
        path: '',
        component: ConverterPage
    }
];
var ConverterPageModule = /** @class */ (function () {
    function ConverterPageModule() {
    }
    ConverterPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ConverterPage]
        })
    ], ConverterPageModule);
    return ConverterPageModule;
}());
export { ConverterPageModule };
//# sourceMappingURL=converter.module.js.map