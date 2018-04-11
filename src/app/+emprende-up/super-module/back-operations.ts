import { BackOperationsInt } from "app/+emprende-up/super-module/back-operations/interface-back-operations";
import { ModalData } from './interfaces/interfaces';

export class BackOperation {
    back: BackOperationsInt;
    isBackOperation: boolean = true;
    modalValidation: ModalData;
    enabledButton: boolean = true;
    modalShow: boolean = false;
    rpta: string = 'rpta';

    constructor() {

    }

}