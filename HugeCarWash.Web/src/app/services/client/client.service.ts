import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, IClient } from '../../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  _baseUrl: string = "https://localhost:5001/api/Users";
  constructor( private http: HttpClient) { }

  // async getClients() : Promise<Observable<IClient[]>> {
  //   return this.http.get<IClient[]>(this._baseUrl).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  // async getClient(id: string) : Promise<Observable<IClient>> {
  //   return this.http.get(this._baseUrl + "/" + id).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  // async createClient(client: IClient) : Promise<Observable<IClient>> {
  //   return this.http.post(this._baseUrl, client).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  // async updateClient(client: IClient, id: string) : Promise<Observable<IClient>> {
  //   return this.http.put(this._baseUrl + "/" + id, client).pipe(map((data: any) => {
  //     console.log(id);
  //     return data.data;
  //   }));
  // }

  // async deleteClient(id: string) : Promise<Observable<boolean>> {
  //   return this.http.delete(this._baseUrl + "/" + id).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  // async getData() : Promise<Observable<string[]>> {
  //   return this.http.get(this._baseUrl).pipe(map((data: any) => {
  //     return data.data.map((item: any) => item.carNumber);
  //   }));
  // }

  getClients(): Promise<IClient[]> {
    return this.http.get(this._baseUrl).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  getClient(id: string): Promise<IClient> {
    return this.http.get(this._baseUrl + "/" + id).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  createClient(client: IClient): Promise<IClient> {
    return this.http.post(this._baseUrl, client).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  updateClient(client: IClient, id: string): Promise<IClient> {
    return this.http.put(this._baseUrl + "/" + id, client).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  deleteClient(id: string): Promise<boolean> {
    return this.http.delete(this._baseUrl + "/" + id).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  getData(): Promise<string[]> {
    return this.http.get(this._baseUrl).toPromise().then((data: any) => {
      return data.data.map((item: any) => item.carNumber);
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }
}
