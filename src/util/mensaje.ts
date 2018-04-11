export interface MensajeInt {
    title: string;
    content: string;
    color: string;
    iconSmall: string;
    timeout: number
}

export class Mensaje {
    mensaje: MensajeInt;

    constructor(title: string, color: string, iconSmall: string = 'fa fa-thumbs-up bounce animated', content: string = '') {
        this.mensaje = {
            title: title,
            color: color,
            content: `<i class='fa fa-clock-o'> ` + content + `</i> ` ,
            iconSmall: iconSmall ,
            timeout: 8000
        }
    }
}
