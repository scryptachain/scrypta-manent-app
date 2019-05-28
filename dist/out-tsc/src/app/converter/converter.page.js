import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import axios from 'axios';
var ConverterPage = /** @class */ (function () {
    function ConverterPage() {
    }
    ConverterPage.prototype.ngOnInit = function () {
        this.getCurrentPrice();
    };
    ConverterPage.prototype.getCurrentPrice = function () {
        var _this = this;
        axios.get('https://api.coingecko.com/api/v3/coins/scrypta').then(function (response) {
            _this.currentPrice = response.data.market_data.current_price.eur;
        });
    };
    ConverterPage.prototype.calculateCurrencyOne = function () {
        this.valueEur = (this.valueScrypta * this.currentPrice * 10);
        this.valueEur.toFixed(2);
    };
    ConverterPage.prototype.calculateCurrencyTwo = function () {
        this.valueScrypta = this.valueEur / this.currentPrice * 10;
    };
    ConverterPage = tslib_1.__decorate([
        Component({
            selector: 'app-converter',
            templateUrl: './converter.page.html',
            styleUrls: ['./converter.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ConverterPage);
    return ConverterPage;
}());
export { ConverterPage };
//# sourceMappingURL=converter.page.js.map