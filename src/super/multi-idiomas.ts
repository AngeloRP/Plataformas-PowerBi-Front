import { TranslateService } from '../translate/translate.service';
export class MultiIdiomas {
    public translatedText: string;
    public supportedLangs: any[];
    camposValidados:boolean = false;
    constructor(public translate: TranslateService) {
        this.supportedLangs = [
            { display: 'English', value: 'en' },
            { display: 'Español', value: 'es' }
        ];

        // set current langage
        this.selectLang('es');
    }

    public getCurrentLang() {
        return this.translate.currentLang;
    }

    selectLang(lang: string) {
        // set current lang;
        this.translate.use(lang);
        this.refreshText();
    }

    refreshText() {
        // refresh translation when language change
        this.translatedText = this.translate.instant('user');
    }
}
