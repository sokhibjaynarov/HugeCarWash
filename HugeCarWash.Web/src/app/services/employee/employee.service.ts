import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployee } from 'src/app/interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  _baseUrl = 'https://localhost:5001/api/employees';

  constructor( private http: HttpClient) { }

  // async getEmployees() : Promise<Observable<IEmployee[]>> {
  //   return this.http.get(`${this._baseUrl}`).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  getEmployees(): Promise<IEmployee[]> {
    return this.http.get(this._baseUrl).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  // async getEmployee(employeeId: string) : Promise<Observable<IEmployee>> {
  //   return this.http.get(`${this._baseUrl}/${employeeId}`).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  getEmployee(employeeId: string): Promise<IEmployee> {
    return this.http.get(`${this._baseUrl}/${employeeId}`).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  // async createEmployee(employee: IEmployee) : Promise<Observable<IEmployee>> {
  //   return this.http.post(this._baseUrl, employee).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  createEmployee(employee: IEmployee) : Promise<IEmployee> {
    return this.http.post(this._baseUrl, employee).toPromise().then((data: any) => {
      return data.data;
    },
    ).catch(err => {
      console.log(err);
    });
  }

  // async updateEmployee(employee: IEmployee, id: string) : Promise<Observable<any>> {
  //   return this.http.put(`${this._baseUrl}/${id}`, employee).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  updateEmployee(employee: IEmployee, id: string) : Promise<IEmployee> {
    return this.http.put(`${this._baseUrl}/${id}`, employee).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  // async deleteEmployee(id: string) : Promise<Observable<boolean>> {
  //   return this.http.delete(`${this._baseUrl}/${id}`).pipe(map((data: any) => {
  //     return data.data;
  //   }));
  // }

  deleteEmployee(id: string) : Promise<boolean> {
    return this.http.delete(`${this._baseUrl}/${id}`).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  // async getData() : Promise<Observable<string[]>> {
  //   return this.http.get(this._baseUrl).pipe(map((data: any) => {
  //     console.log(data.data);
  //     return data.data.map((item: any) => item.firstName);
  //   }));
  // }

  getData() : Promise<string[]> {
    return this.http.get(this._baseUrl).toPromise().then((data: any) => {
      return data.data.map((item: any) => item.firstName);
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

}
