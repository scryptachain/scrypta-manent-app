import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';


const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    ChartModule.forRoot(require('highcharts')),
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage,ModaltransactionPage],
  entryComponents:[ModaltransactionPage]
})
export class DashboardPageModule {}
