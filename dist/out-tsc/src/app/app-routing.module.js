import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
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
    { path: 'converter', loadChildren: './converter/converter.module#ConverterPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map