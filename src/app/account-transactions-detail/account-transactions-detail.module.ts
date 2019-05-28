import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountTransactionsDetailPage } from './account-transactions-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AccountTransactionsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
 // declarations: [AccountTransactionsDetailPage]
})
export class AccountTransactionsDetailPageModule {}
