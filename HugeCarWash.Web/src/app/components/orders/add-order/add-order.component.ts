import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { IClient } from 'src/app/interfaces/client';
import { IEmployee } from 'src/app/interfaces/employee';
import { IOrder, Order } from 'src/app/interfaces/order';
import { ClientService } from 'src/app/services/client/client.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { OrderService } from 'src/app/services/order/order.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  clients!: IClient[];
  employees!: IEmployee[];
  form!: FormGroup;

  optionsClient = ["Sam", "Varun", "Jasmine"];
  optionsEmployee = ["Sam", "Varun", "Jasmine"];

  filteredOptionsClient: any;
  filteredOptionsEmployee: any;

  constructor( private service: OrderService,
    private router: Router,
    private employeeService: EmployeeService,
    private clientService: ClientService) { }

  async ngOnInit(): Promise<void> {

    this.clients = await this.clientService.getClients();

    this.employees = await this.employeeService.getEmployees();

    this.getEmployeeNames();
    this.getClientCarNumbers();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      carNumber: new FormControl('', Validators.required),
      employeeName: new FormControl('', Validators.required),
      price: new FormControl(60000, Validators.required),
    });

    this.form.get('employeeName')!.valueChanges.subscribe(response => {
      this.filterDataEmployee(response);
    });
    this.form.get('carNumber')!.valueChanges.subscribe(response => {
      this.filterDataClient(response);
    });
  }

  filterDataClient(enteredData: string): void {
    this.filteredOptionsClient = this.optionsClient.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    });
  }

  filterDataEmployee(enteredData: string): void {
    this.filteredOptionsEmployee = this.optionsEmployee.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    });
  }

  async getEmployeeNames(): Promise<void>{
    this.optionsEmployee = await this.employeeService.getData();
    this.filteredOptionsEmployee = this.optionsEmployee;
  }

  async getClientCarNumbers(): Promise<void> {
    this.optionsClient = await this.clientService.getData();
    this.filteredOptionsClient = this.optionsClient;
  }
  
  async onSubmit(): Promise<void> {
    await this.service.createOrder(this.form.value);
    this.router.navigate(["/orders"]);
  }
}
