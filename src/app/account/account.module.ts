import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';
import { ModaltransactionPage } from '../modaltransaction/modaltransaction.page';
import { AccountTransactionsDetailPage } from '../account-transactions-detail/account-transactions-detail.page';


const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountPage,AccountTransactionsDetailPage],
  entryComponents:[AccountTransactionsDetailPage]
})
export class AccountPageModule {}
