import { Widget } from 'app/+emprende-up/super-module/widget-super/widget';
import { HttpOperations } from 'app/+emprende-up/super-module/interfaces';
import { Mensaje } from 'util/mensaje';
import { Section } from 'app/+emprende-up/super-module/form-super/form-clases/section';
import { RowForm, SectionInt } from '../app/+emprende-up/super-module/form-super/input-form';
import { Input } from '@angular/core';
import { TranslateService } from 'translate';
export class ComponenteMultidioma {
    public translatedText: string;
    public supportedLangs: any[];
    widget: Widget;
    @Input() titulo = '';
    private rowForms: Array<RowForm>;
    private sectionsInt: Array<SectionInt>;
    constructor(public translate: TranslateService) {
        this.rowForms = new Array<RowForm>();
        this.sectionsInt = new Array<SectionInt>();
        this.widget = new Widget();
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

    public fillComponente(
        headerTitle: string,
        titleButton: string,
        successMessage: string,
        errorMessage: string,
        inputsPorFila: number,
        sections: Section[],
        isBackOperation: boolean,
        modalShow: boolean,
        responseJson: any,
        rules: any,
        url: string = '',
        typeOperationBack: HttpOperations = HttpOperations.POST
    ) {
        this.rowForms = new Array<RowForm>();
        this.sectionsInt = new Array<SectionInt>();
        this.widget = new Widget();
        this.widget.headerTitle = headerTitle;
        this.widget.form.titleButton = titleButton;
        this.widget.form.validationOptions = {
            rules: rules
        };
       // console.log('Response Json:' + responseJson);
        const successM = new Mensaje(successMessage, '#296191');
        const errorM = new Mensaje(errorMessage, '#296191');
        this.widget.form.back.back = {
            url: url,
            responseJson: responseJson,
            typeOperation: typeOperationBack,
            successMessage: successM.mensaje,
            errorMessage: errorM.mensaje
        }
        this.widget.form.back.modalShow = modalShow;
        this.widget.form.back.isBackOperation = isBackOperation;

        const dividendo = Math.ceil(sections.length / inputsPorFila);
       // console.log('Dividendo:' + dividendo);
       const residuo = sections.length % inputsPorFila;
       // console.log('Residuo:' + residuo);
        for (let i = 0; i < dividendo; i++) {
            this.sectionsInt = new Array<SectionInt>();
            if ((i === (dividendo - 1)) && residuo !== 0) {
                for (let j = 0; j < residuo; j++) {
                   // console.log('Section' + JSON.stringify(sections[ (i * inputsPorFila) + j].getSection()));

                    this.sectionsInt.push(sections[(i * inputsPorFila) + j].getSection());
                }
            } else {
                for (let j = 0; j < inputsPorFila; j++) {
                    this.sectionsInt.push(sections[i * inputsPorFila + j].getSection());
                }
            }
            this.rowForms.push({
                sections: this.sectionsInt
            })
           // console.log(JSON.stringify(this.rowForms[i]));

        }
        this.widget.form.rows = this.rowForms;

       // console.log('Response Json:' + this.widget.form.back.back.responseJson);

    }


}
