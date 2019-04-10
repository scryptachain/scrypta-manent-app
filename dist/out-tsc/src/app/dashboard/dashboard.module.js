import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';
import { ChartModule } from 'angular2-highcharts';
var routes = [
    {
        path: '',
        component: DashboardPage
    }
];
var DashboardPageModule = /** @class */ (function () {
    function DashboardPageModule() {
    }
    DashboardPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                ChartModule.forRoot(require('highcharts')),
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DashboardPage]
        })
    ], DashboardPageModule);
    return DashboardPageModule;
}());
export { DashboardPageModule };
//# sourceMappingURL=dashboard.module.js.map