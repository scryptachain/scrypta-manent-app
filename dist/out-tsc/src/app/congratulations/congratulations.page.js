import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file/';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
var CongratulationsPage = /** @class */ (function () {
    function CongratulationsPage(transfer, file, router, fileTransfer, diagnostic) {
        this.transfer = transfer;
        this.file = file;
        this.router = router;
        this.diagnostic = diagnostic;
        this.storageDirectory = '';
    }
    CongratulationsPage.prototype.ngOnInit = function () {
        var credentials = localStorage.getItem('credential');
        console.log(credentials);
        var credJson = JSON.parse(credentials);
        this.public_address = credJson.pub;
        var files = new Blob([credJson.walletstore], { type: 'sid' });
        this.filedownload = files;
        var buttonid = document.getElementById('downloadsid');
        this.a = buttonid;
    };
    CongratulationsPage.prototype.downloadFile = function () {
        // console.log(this.public_address)
        //this.a.href=URL.createObjectURL(this.file);
        //this.a.download=this.public_address+'.sid';
        var fileTransfer = this.transfer.create();
        console.log(fileTransfer);
        this.file.writeFile(this.file.externalDataDirectory, this.public_address + '.sid', this.filedownload);
        console.log(this.file.externalDataDirectory);
        alert('File .sid salvato con Successo!');
        /*
        fileTransfer.download(url, this.file.applicationStorageDirectory +'/Download/'+ this.public_address+'.pdf').then((entry) => {
          console.log('download complete: ' + entry.toURL());
        }, (error) => {
         console.log('ccccc',error)
        })
      */
    };
    CongratulationsPage.prototype.goNext = function () {
        this.router.navigate(['/login-to-wallet']);
    };
    CongratulationsPage.prototype.goPrev = function () {
        history.go(-1);
    };
    CongratulationsPage = tslib_1.__decorate([
        Component({
            selector: 'app-congratulations',
            templateUrl: './congratulations.page.html',
            styleUrls: ['./congratulations.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FileTransfer, File, Router, FileTransfer, Diagnostic])
    ], CongratulationsPage);
    return CongratulationsPage;
}());
export { CongratulationsPage };
//# sourceMappingURL=congratulations.page.js.map