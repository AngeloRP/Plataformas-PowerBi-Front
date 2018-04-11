import { RowForm, HttpOperations } from './input-form';
import { Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { Http } from '@angular/http';
import { NotificationService } from '../../../shared/utils/notification.service';
import { BackOperationsInt } from '../back-operations/interface-back-operations';
import { ModalData } from 'app/+emprende-up/super-module/interfaces/interfaces';
import { BackOperation } from 'app/+emprende-up/super-module/back-operations';
import { Operations } from 'app/+emprende-up/super-module/operations';
import { ValidationOptions } from 'app/+emprende-up/super-module/form-super/form-clases/validation_options';

export class Form extends Operations {

    // CONEXION BACK
    @Input() isSubmited = false;
    @Input() urlReemplazo = '';
    @Input() nombreId = '';
    @Input() actualizaSiguienteConsulta = true;
    @Input() hasButtonEliminar = false;
    @Input() idForm = 'form_0';
    @Input() maxSecciones = 2;
    @Input() buttonClass = 'btn btn-primary submitButton';
    @Input() validationOptions: any;
    @Input() claseSCSS = 'smart-form';
    @Input() claseCSSextra = '';
    @Input() titleButton: string;
    @Input() header = '';
    @Input() hasButton = false;
    @Output() submit: EventEmitter<any>;
    @Output() terminoCarga: EventEmitter<boolean>;
    @Output() eliminoFormulario: EventEmitter<any>;
    validation: ValidationOptions;
    constructor(
        modalShow?: boolean,
        titleButton?: string,

    ) {
        super();
        this.eliminoFormulario = new EventEmitter<any>();
        this.terminoCarga = new EventEmitter<boolean>();
       // console.log('Formulario Creado');
        this.submit = new EventEmitter<any>();
    }

    onSubmit() {
       // console.log('Tazdingo');
        // this.isSubmited = true;
    }


}
