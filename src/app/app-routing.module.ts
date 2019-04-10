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
  { path: 'backup', loadChildren: './backup/backup.module#BackupPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 
