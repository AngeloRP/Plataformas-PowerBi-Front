import { HttpOperations } from '../form-super/input-form';
import { MensajeInt } from 'util/mensaje';
import { Header } from 'app/+emprende-up/super-module/interfaces';
export interface BackOperationsInt {
    responseJson: any;
    url?: string;
    headersLocalStorage?: string[];
    headers?: Header[];
    typeOperation?: HttpOperations;
    successMessage?: MensajeInt;
    errorMessage?: MensajeInt;
}
