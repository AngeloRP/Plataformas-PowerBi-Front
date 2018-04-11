export enum InputTypes {
    INPUT = 0,
    SELECT = 1,
    TEXT_AREA = 2,
    LABEL = 3
}

export enum HttpOperations {
    GET = 0,
    POST = 1,
    PUT = 2,
    PATCH = 3
}
/**
 * @export
 * @interface Option
 * @param value: any
 * @param detail: string
 */
export interface Option {
    value: any,
    detail: string,
}
export interface Span {
    claseImagenB: string;
    claseImagen: string;
    advertencia: string;
}
export interface SectionInt {
    isRequired:boolean,
    clase: string,
    imagen: string,
    name: string,
    inputType: InputTypes,
    hasIcon?:boolean,
    type?: string,
    placeholder?: string,
    // Parte para Select
    options?: Option[],
    optionsDisableds?: Option,
    claseExtra?: string,
    // Parte para TextArea
    rows?: number,
    columns?: number,
    min?: any,
    max?: any,
    advertencia?: string,
    hasLabel?: boolean,
    isSeteable?: boolean,
    value?: any;
    span?: Span;
    url ?: string;
}


export interface RowForm {
    sections: Array<SectionInt>;
}
