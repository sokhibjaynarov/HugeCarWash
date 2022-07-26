import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

  get(url: string, id: string) : Promise<any> {
    return this.http.get(`${url}/${id}`).toPromise().then((data: any) => {
      return data;
    });
  }

  getAll(url: string) : Promise<any> {
    return this.http.get(url).toPromise().then((data: any) => {
      return data.data;
    });
  }

  post(url: string, data: any) : Promise<any> {
    return this.http.post(url, data).toPromise().then((data: any) => {
      return data.data;
    });
  }

  put(url: string, data: any) : Promise<any> {
    return this.http.put(url, data).toPromise().then((data: any) => {
      return data.data;
    });
  }

  delete(url: string, id: string) : Promise<any> {
    return this.http.delete(`${url}/${id}`).toPromise().then((data: any) => {
      return data.data;
    });
  }

}
