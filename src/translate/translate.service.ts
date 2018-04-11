
import {Injectable, Inject} from '@angular/core';
import { TRANSLATIONS } from './translate';

@Injectable()
export class TranslateService {
    private _currentLang: string;

    public get currentLang() {
        return this._currentLang;
    }

    // Inyecta el archivo de traduccion
    constructor(@Inject(TRANSLATIONS) private _translations: any) {
    }

    public use(lang: string): void {
        // Cambia el lenguaje actual
        this._currentLang = lang;
    }

    private translate(key: string): string {
        // private perform translation
        const translation = key;

        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }

        return translation;
    }

    public instant(key: string) {
        // call translation
        return this.translate(key);
    }
}
