import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CongratulationsPage } from './congratulations.page';
var routes = [
    {
        path: '',
        component: CongratulationsPage
    }
];
var CongratulationsPageModule = /** @class */ (function () {
    function CongratulationsPageModule() {
    }
    CongratulationsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CongratulationsPage]
        })
    ], CongratulationsPageModule);
    return CongratulationsPageModule;
}());
export { CongratulationsPageModule };
//# sourceMappingURL=congratulations.module.js.map