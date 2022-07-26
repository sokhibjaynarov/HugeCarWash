import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees!: IEmployee[];

  constructor( private service: EmployeeService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.employees = await this.service.getEmployees();
  }

  showEmployee(id: string): void {
    this.router.navigate(['/employee/' + id]);
  }

  updateEmployee(id: string): void {
    this.router.navigate(['/update-employee/' + id]);
  }

}
