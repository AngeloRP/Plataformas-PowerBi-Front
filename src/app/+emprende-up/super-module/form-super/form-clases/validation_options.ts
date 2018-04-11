import { TranslateService } from '../../../../../translate/translate.service';


export class ValidationOptions {
    private rules: any;
    private messages: any;
    private submit: () => void;

    constructor(
        // private translate: TranslateService,
        jsonRules: any, jsonMessages: any,
        campos: string[],
        metodoSubmit: () => void,
        inicioMensaje?: string
    ) {
       // console.log('Campos:' + campos);
       // console.log('Mensaje:' + inicioMensaje);
        this.rules = jsonRules;
        this.messages = jsonMessages;
        this.submit = metodoSubmit;
        if (inicioMensaje !== undefined) {
            // this.fillMensajes(campos, inicioMensaje);
        }
        // this.fillRules(campos);
    }

    public getValidationOptions(): any {
        return {
            rules: this.rules
        }
    }

   /* private fillMensajes(campos: string[], inicioMensaje: string) {
        for (let i = 0; i < campos.length; i++) {
            this.messages[campos[i]]['required'] = this.translate.instant(inicioMensaje) + this.translate.instant(campos[i]);
        }
    }*/

    private fillRules(campos: string[]) {
        for (let i = 0; i < campos.length; i++) {
            this.rules[campos[i]]['required'] = true;
        }
    }
}
