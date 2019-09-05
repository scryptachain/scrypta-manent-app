import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QRCodeModule } from 'angularx-qrcode';
import { AccountDetailPage } from './account-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AccountDetailPage
  }
];

@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [AccountDetailPage]
})
export class AccountDetailPageModule { }
