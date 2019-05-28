import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import axios from 'axios';
//import {ChartModule } from 'angular2-highcharts'
var DashboardPage = /** @class */ (function () {
    function DashboardPage() {
        this.balance = '';
        this.transactions = [];
    }
    DashboardPage.prototype.ngOnInit = function () {
        this.balance = (JSON.parse(localStorage.getItem('balance')));
        console.log(this.balance);
        this.fetchTransactions();
        var lyra = this.balance['data'];
        this.lyra = lyra;
        console.log(lyra);
        this.checkValore();
        this.fetchGraph();
        //console.log(this.value)
        console.log('initial', this.options);
    };
    DashboardPage.prototype.fetchTransactions = function () {
        var transazioni = JSON.parse(localStorage.getItem('transactions'));
        for (var i = 0; i < transazioni.data.length; i++) {
            this.transactions.push(transazioni.data[i]);
        }
        console.log(this.transactions);
    };
    DashboardPage.prototype.fetchGraph = function () {
        var app = this;
        axios.get("https://api.coingecko.com/api/v3/coins/scrypta/market_chart?vs_currency=eur&days=30")
            .then(function (response) {
            app.dati = response.data.prices;
            console.log(app.dati);
            app.options = {
                series: [
                    {
                        data: app.dati,
                        type: "spline",
                        zIndex: 0,
                        marker: {
                            enabled: false
                        },
                        name: "Price EUR"
                    }
                ],
                yAxis: {
                    title: {
                        text: "price"
                    }
                },
                xAxis: {
                    type: "datetime",
                    tickInterval: 24 * 3600 * 1000
                },
                credits: {
                    enabled: false
                },
                chart: {
                    backgroundColor: "transparent"
                },
                title: {
                    text: app.lyra + ' LYRA'
                },
                subtitle: {
                    text: app.value + ' EUR'
                }
            };
        });
    };
    DashboardPage.prototype.checkValore = function () {
        var _this = this;
        axios.get('https://api.coingecko.com/api/v3/coins/scrypta/').then((function (response) {
            // console.log(response);
            console.log(typeof (response.data.market_data.current_price.eur));
            //this.valore=response.data.market_data.current_price.eur
            _this.valore = response.data.market_data.current_price.eur;
            _this.calcolo();
        }));
    };
    DashboardPage.prototype.calcolo = function () {
        // console.log(this.valore)
        this.value = (Number(this.lyra) * this.valore).toFixed(2);
    };
    DashboardPage = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.page.html',
            styleUrls: ['./dashboard.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.page.js.map