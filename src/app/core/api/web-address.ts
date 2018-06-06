import { Headers } from '@angular/http';
export class WebAddress {
    public headers: Headers;
    private dominio: string;
    private siguientes: string;
    private queryParams: any[] = [];
    private formData: any[] = [];

    constructor(url: string, headers: Headers) {
        this.dominio = url;
        this.headers = headers;
        this.siguientes = '';
    }

    addUrl(ruta: any) {
        if (ruta !== undefined && ruta !== null && ruta !== '') {
            // this.dominio += '/' + ruta;
            this.siguientes += '/' + ruta;
        }

    }

    setUlimo(ruta: any) {
        if (ruta !== undefined && ruta !== null && ruta !== '') {
            // this.dominio += '/' + ruta;
            this.siguientes = '/' + ruta;
        }
    }
    addHeaders(headers: { name, value }[]) {
        if (headers !== null) {
            for (const header of headers) {
                this.addHeader(header);
            }
        }
    }

    addHeader(header: { name, value }) {
        if (this.headers.has(header.name)) {
            this.headers.delete(header.name);
        }
        this.headers.append(header.name, header.value);
    }

    addQueryParams(query: { name, value }) {
        const indice = this.queryParams.indexOf(query);
        if (indice >= 0) {
            this.queryParams[indice] = query;
        } else {
            this.queryParams.push(query);
        }

    }

    addFormData(data: { name, value }) {
        const indice = this.formData.indexOf(data);
        if (indice >= 0) {
            this.formData[indice] = data;
        } else {
            this.formData.push(data);
        }

    }

    getFormData() {
        return this.formData;
    }

    public getUrl(): string {
        /*let query = '';
        for (let queryParam of this.queryParams)
          query += '&' + queryParam.name + '=' + queryParam.value;
        return this.urlPath + '?' + query.substring(1);/** */
        return this.dominio + this.siguientes;
    }

    public getHeaders(): Headers {
        return this.headers;
    }

    public getHeaderValues(): string[][] {
        return this.headers.values();
    }

    public getHeaderKeys(): string[] {
        return this.headers.keys();
    }

}
