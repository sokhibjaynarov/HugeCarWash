import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrder, IOrderDto } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _baseUrl = 'https://localhost:5001/api/orders';

  constructor( private http: HttpClient) { }

  // async getOrders() : Promise<Observable<IOrder[]>> {
  //   return this.http.get(`${this._baseUrl}`).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  // async getOrder(orderId: string) : Promise<Observable<IOrder>> {
  //   return this.http.get(`${this._baseUrl}/${orderId}`).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  // async createOrder(order: IOrder) : Promise<Observable<IOrder>> {
  //   return this.http.post(this._baseUrl, order).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  // async updateOrder(order: IOrder, id: string) : Promise<Observable<IOrder>> {
  //   return this.http.put(`${this._baseUrl}/${id}`, order).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  // async deleteOrder(id: string) : Promise<Observable<boolean>> {
  //   return this.http.delete(`${this._baseUrl}/${id}`).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }


  getOrders(): Promise<IOrder[]> {
    return this.http.get(this._baseUrl + "/getAll").toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  getAllOrders(): Promise<IOrderDto[]> {
    return this.http.get(this._baseUrl + "/getAllOrders").toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  getOrder(orderId: string): Promise<IOrder> {
    return this.http.get(`${this._baseUrl}/get/${orderId}`).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  createOrder(order: IOrder): Promise<IOrder> {
    return this.http.post(this._baseUrl + "/create", order).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  updateOrder(order: IOrder, id: string): Promise<IOrder> {
    return this.http.put(`${this._baseUrl}/update/${id}`, order).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  deleteOrder(id: string): Promise<boolean> {
    return this.http.delete(`${this._baseUrl}/delete/${id}`).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }
  
}
