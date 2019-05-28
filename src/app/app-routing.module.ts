import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'congratulations', loadChildren: './congratulations/congratulations.module#CongratulationsPageModule' },
  { path: 'login-to-wallet', loadChildren: './login-to-wallet/login-to-wallet.module#LoginToWalletPageModule' },
  
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'send', loadChildren: './send/send.module#SendPageModule' },
  { path: 'converter', loadChildren: './converter/converter.module#ConverterPageModule' },
  { path: 'backup', loadChildren: './backup/backup.module#BackupPageModule' },
  { path: 'successfulsend', loadChildren: './successfulsend/successfulsend.module#SuccessfulsendPageModule' },
  { path: 'receive', loadChildren: './receive/receive.module#ReceivePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'card-settings', loadChildren: './card-settings/card-settings.module#CardSettingsPageModule' },
  { path: 'modal-login', loadChildren: './modal-login/modal-login.module#ModalLoginPageModule' },
  { path: 'archive', loadChildren: './archive/archive.module#ArchivePageModule' },
  { path: 'archivedetail', loadChildren: './archivedetail/archivedetail.module#ArchivedetailPageModule' },
  { path: 'upload-modal', loadChildren: './upload-modal/upload-modal.module#UploadModalPageModule' },
  { path: 'modaltransaction', loadChildren: './modaltransaction/modaltransaction.module#ModaltransactionPageModule' },
  { path: 'account-transactions-detail', loadChildren: './account-transactions-detail/account-transactions-detail.module#AccountTransactionsDetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 
