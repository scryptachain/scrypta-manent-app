import { Injectable } from '@angular/core';
import ScryptaCore from '../scryptacore.js';

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