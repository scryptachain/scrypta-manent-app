import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
function getWindow() {
    return window;
}
var WindowRefService = /** @class */ (function () {
    function WindowRefService() {
    }
    Object.defineProperty(WindowRefService.prototype, "nativeWindow", {
        get: function () {
            return getWindow();
        },
        enumerable: true,
        configurable: true
    });
    WindowRefService = tslib_1.__decorate([
        Injectable()
    ], WindowRefService);
    return WindowRefService;
}());
export { WindowRefService };
//# sourceMappingURL=windowservice.js.map