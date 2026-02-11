import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Categorias {
  url: string = 'http://localhost:8080/v1/categorias';

  constructor(private http: HttpClient) {
  }

  getCategorias() {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa('alfredo:alfredo123')
    });

    return this.http.get<any>(this.url, {headers: headers});
  }
}
