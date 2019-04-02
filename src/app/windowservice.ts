import { Injectable } from '@angular/core';
import ScryptaCore from '../assets/js/scryptacore.js';

export interface ICustomWindow extends Window {
    ScryptaCore: ScryptaCore;
}

function getWindow (): any {
    return window;
}

@Injectable()
export class WindowRefService {
    get nativeWindow (): ICustomWindow {
        return getWindow();
    }
}