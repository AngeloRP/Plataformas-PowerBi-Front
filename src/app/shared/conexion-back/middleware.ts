import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Uso de Tokens
const headers = new Headers({ 'Content-Type': 'application/json' });
headers.append('Access-Control-Allow-Origin', '*');

// Extracion de la informacion que se recibe, header and body
function extraData(res: Response) {
 // console.log('Response');
 // console.log(res);
 // console.log('xxxxxxxxxxxxxxxxxxx');
  return {
    headers: res.headers,
    data: res.json()
  };
}
// Manejo de errores en los servicios
function handleError(error) {
 // console.log('Handle Erro');
 // console.log(error);
 // console.log('-----------------------');

  const errMsg = error.message
    ? error.message
    : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  const body = JSON.parse(error._body);
  const obj = [
    {
      status: error.status,
      statusText: error.statusText,
      type: error.type,
      ok: error.ok,
      body: body
    }
  ];
  manejoError(obj);
  return Observable.throw(errMsg);
}

function manejoError(error) {
 // console.log('Error');
 // console.log(error);
  if (error[0].status === 422) {
    const injson = Object.keys(error[0].body);
    let err = 'Acción invalida: \n';
    for (let x of injson) {
      err = err + error[0].body[x][0] + '\n';
    }
    alert(err);
  }
}

export const config_server = {
  headers: headers,
  extraData: extraData,
  handleError: handleError
};
