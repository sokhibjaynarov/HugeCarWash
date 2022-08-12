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


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  clients!: IClient[];
  employees!: IEmployee[];

  optionsClient!: IClient[];
  optionsEmployee!: IEmployee[];

  form = new FormGroup({
    userId: new FormControl('', Validators.required),
    employeeId: new FormControl('', Validators.required),
    price: new FormControl(60000, Validators.required),
  });

  constructor( private service: OrderService,
    private router: Router,
    private employeeService: EmployeeService,
    private clientService: ClientService) { }

  async ngOnInit(): Promise<void> {
    this.optionsClient = await this.clientService.getClients();

    this.optionsEmployee = await this.employeeService.getEmployees();
  }

  keywordEmployee = 'firstName';
  keywordClient = 'carNumber';

  selectEventClient(item: IClient): void {
    this.form.value.userId = item.id;
  }

  selectEventEmployee(item: IEmployee): void {
    this.form.value.employeeId = item.id;
  }
  
  async onSubmit(): Promise<void> {
    console.log(this.form.value);
    await this.service.createOrder(this.form.value);
    this.router.navigate(["/orders"]);
  }
}
