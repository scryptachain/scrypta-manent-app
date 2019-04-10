import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.appPages = [
            {
                title: 'Home',
                url: '/home',
            },
            /*{
              title: 'List',
              url: '/list',
              icon: 'list'
            }*/
            {
                title: 'Dashboard',
                url: '/dashboard'
            },
            {
                title: 'Backup',
                url: '/backup'
            },
            {
                title: 'Card Settings',
                url: '/card-settings'
            },
            {
                title: 'General Settings',
                url: '/general-settings'
            },
            {
                title: 'Converter',
                url: '/converter'
            }
        ];
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map