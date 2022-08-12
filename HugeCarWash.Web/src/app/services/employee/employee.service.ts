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


  getEmployees(): Promise<IEmployee[]> {
    return this.http.get(this._baseUrl).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  getEmployee(employeeId: string): Promise<IEmployee> {
    return this.http.get(`${this._baseUrl}/${employeeId}`).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  createEmployee(employee: IEmployee) : Promise<IEmployee> {
    return this.http.post(this._baseUrl, employee).toPromise().then((data: any) => {
      return data.data;
    },
    ).catch(err => {
      console.log(err);
    });
  }

  updateEmployee(employee: IEmployee, id: string) : Promise<IEmployee> {
    return this.http.put(`${this._baseUrl}/${id}`, employee).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  deleteEmployee(id: string) : Promise<boolean> {
    return this.http.delete(`${this._baseUrl}/${id}`).toPromise().then((data: any) => {
      return data.data;
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

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
