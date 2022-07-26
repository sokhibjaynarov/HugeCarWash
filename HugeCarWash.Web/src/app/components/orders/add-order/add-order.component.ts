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
    private clientService: ClientService,
    private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    // (await this.clientService.getClients()).subscribe(data => {
    //   this.clients = data;
    // });

    this.clients = await this.clientService.getClients();

    // (await this.employeeService.getEmployees()).subscribe(data => {
    //   this.employees = data;
    // });

    this.employees = await this.employeeService.getEmployees();

    this.getEmployeeNames();
    this.getClientCarNumbers();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      'carNumber': ['', Validators.required],
      'employeeName': ['', Validators.required],
      'price':['', Validators.required],
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
    // (await this.employeeService.getData()).subscribe((response: string[]) => {
    //   this.optionsEmployee = response;
    //   this.filteredOptionsEmployee = response;
    // });
    this.optionsEmployee = await this.employeeService.getData();
    this.filteredOptionsEmployee = this.optionsEmployee;
  }

  async getClientCarNumbers(): Promise<void> {
    // (await this.clientService.getData()).subscribe((response: string[]) => {
    //   this.optionsClient = response;
    //   this.filteredOptionsClient = response;
    // });
    this.optionsClient = await this.clientService.getData();
    this.filteredOptionsClient = this.optionsClient;
  }
  
  // order = new Order(
  //   3, //this.form.value.price,
  //   this.clients.find(client => client.carNumber === this.form.value.carNumber)!.id,
  //   this.employees.find(employee => employee.firstName === this.form.value.employeeName)!.id
  // );
  
  async onSubmit(): Promise<void> {
    // (await this.service.createOrder(this.form.value)).subscribe((data: IOrder) => {
    //   this.router.navigate(["/orders"]);
    // }, (error: any) => {
    //   console.log(error);
    // });

    await this.service.createOrder(this.form.value);
    this.router.navigate(["/orders"]);
  }
}
