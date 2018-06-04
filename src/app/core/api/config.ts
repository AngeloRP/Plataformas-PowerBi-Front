import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Uso de Tokens
const headers = new Headers(
  { 'Content-Type': 'application/json', 'API-TOKEN': 'ZSSsSfsxtAZ46a8W9dVtCUBvH8vRcOlbHeEAu77X' }
);
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Headers', '*');
headers.append('Access-Controll-Allow-Credentials', '*');
headers.append('Access-Control-Request-Headers', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// headers.append('USER-ID', window.localStorage.getItem('user_id'));
// headers.append('API-TOKEN', 'ZSSsSfsxtAZ46a8W9dVtCUBvH8vRcOlbHeEAu77X');
/*headers.append('Access-Control-Request-Headers', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');*/
// Extracion de la informacion que se recibe, header and body
function extraData(res: Response) {
//  console.log('Response');
//  console.log(res);
//  console.log('xxxxxxxxxxxxxxxxxxx');
  const body = res.json();
  if (body) {
    return {
      headers: res.headers,
      data: body.data || body
    }
  } else {
    return {}
  }
}
// Manejo de errores en los servicios
function handleError(error: Response) {
 // console.log('Handle Error');
 // console.log(error);
 // console.log('-----------------------');
  /*
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    let body = JSON.parse(error._body);
    let obj = [{
      status: error.status,
      statusText: error.statusText,
      type: error.type,
      ok: error.ok,
      body: body
    }];
    // manejoError(obj);
    return Observable.throw(errMsg);*/
  // return JSON.stringify(error);
    return Observable.throw(error.json().error || 'Server error');
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
  'headers': headers,
  'extraData': extraData,
  'handleError': handleError
};
